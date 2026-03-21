export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "fix-core-isolation-windows-canary",
    title: "Fix Missing Core Isolation on Windows Dev/Canary Builds",
    date: "2026-03-21",
    tags: ["windows", "security", "hvci", "insider"],
    summary:
      "Memory Integrity vanishes after a Canary build update. Here's why it happens and the registry fix that brings it back.",
    content: `## The Problem

After updating to Windows Dev/Canary Build 26300.8068 (March 13, 2026), Core Isolation / Memory Integrity disappears from Windows Security settings entirely. You might also see a .NET Framework error for DXSETUP.exe pointing to a Microsoft docs page with \`version=(null)\` in the URL.

These are two separate issues triggered by the same update.

## What Actually Happened

### Core Isolation Gone

Build 26300.8068 introduced a **WHCP-first kernel driver trust model** that removes default trust for all cross-signed drivers. During the in-place build upgrade, the \`WasEnabledBy\` registry key under the HVCI scenario gets deleted.

Without this key, the Windows Security UI grays out the Memory Integrity toggle and shows "This setting is managed by your administrator" — even though no admin policy exists. It's a missing DWORD, not enterprise lockdown.

The new cross-signed driver policy also operates on the same Code Integrity layer as HVCI. It audits for 100 hours + 3 reboots before enforcement. Any incompatible kernel driver (RGB software, audio interfaces, AMD Ryzen Master, anti-cheat) can trigger the boot-safety cutoff: if the system BSODs within 3 boots of HVCI being enabled, Windows auto-disables it.

### DXSETUP.exe .NET Error

The URL tells the whole story:

\`\`\`
version=(null)     — GetCORVersion() returned null (.NET 4.0 deprecated it)
processName=DXSETUP.exe  — Legacy DirectX installer (June 2010)
osver=6            — Windows compat shim (no Win10/11 manifest)
shimver=4.0.30319.0      — .NET CLR 4 RTM shim
\`\`\`

DXSETUP.exe calls the deprecated \`GetCORVersion()\` API to probe for .NET. On .NET 4.0+, this returns null. The shim opens your browser to the error page. **HVCI doesn't block user-mode EXEs** — it's strictly kernel-mode. These issues are unrelated.

## The Fix

### Fix 1: Restore Core Isolation

Open an **elevated** Command Prompt (Run as Administrator):

\`\`\`bat
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity" /v Enabled /t REG_DWORD /d 1 /f
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity" /v WasEnabledBy /t REG_DWORD /d 2 /f
bcdedit /set {current} hypervisorlaunchtype auto
\`\`\`

**Before rebooting**, check for blocked drivers:

\`\`\`bat
wevtutil qe Microsoft-Windows-CodeIntegrity/Operational /q:"*[System[(EventID=3023 or EventID=3033 or EventID=3087)]]" /c:10 /f:text
\`\`\`

If you see blocked drivers, identify them and decide: remove the driver or accept HVCI being off for that hardware.

**Escape hatch**: If reboot loops, boot into Recovery Console and run:

\`\`\`bat
bcdedit /set {current} hypervisorlaunchtype off
\`\`\`

### Fix 2: DXSETUP.exe

On Canary Build 29553+, the \`NetFx3\` optional feature no longer exists (\`dism /online /enable-feature /featurename:NetFx3\` returns error 0x800f080c).

Instead, download the **patched DirectX June 2010 redistributable** from Microsoft — the April 2011 refresh that removes the \`GetCORVersion()\` call:

**[DirectX End-User Runtimes (June 2010)](https://www.microsoft.com/download/details.aspx?id=8109)**

Extract and run:

\`\`\`bat
directx_Jun2010_redist.exe /Q /T:"%TEMP%\\dxredist"
"%TEMP%\\dxredist\\DXSETUP.exe" /silent
rmdir /S /Q "%TEMP%\\dxredist"
\`\`\`

## Why This Keeps Happening

Microsoft treats this as intentional security hardening, not a bug. The Insider blog release notes for Build 26300.8068 don't list HVCI or Memory Integrity under "Known Issues." The cross-signed driver enforcement, the registry key deletion during upgrades, and the phantom "no incompatible drivers found" UI bug are all undocumented side effects.

The pattern: every Canary/Dev build tightens the kernel CI policy. Legacy drivers break. HVCI breaks as a side effect. Microsoft says "file a Feedback Hub report." The fix is always the same three registry commands.

## Sources

- [Enable Memory Integrity — Microsoft Learn](https://learn.microsoft.com/en-us/windows/security/hardware-security/enable-virtualization-based-protection-of-code-integrity)
- [DXSETUP Update — Chuck Walbourn](https://walbourn.github.io/dxsetup-update/)
- [Build 26300.8068 Dev Channel — Windows Insider Blog](https://blogs.windows.com/windows-insider/2026/03/13/announcing-windows-11-insider-preview-build-26300-8068-dev-channel/)
- [Memory Integrity Switches Back Off — TechCommunity](https://techcommunity.microsoft.com/discussions/windowsinsiderprogram/memory-integrity-switches-back-off/4468257)
- [OEM HVCI Enablement — Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/oem-hvci-enablement)`,
  },
];
