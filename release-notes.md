# TreeFrogUI v1.8.0_i prerelease

## Changes since v1.8.0_h

- **Nintendo DS:** faster MIPS 3D span interpolation, a combined fog/anti-aliasing scan, and aligned cartridge reads. Frame output stayed identical in the QEMU replay checks; hardware speedup still needs testing.
- **FrogUI:** SELECT + L1 saves the visible menu frame as a BMP under `/mnt/sdcard/screenshots/`; search avoids extra filesystem metadata calls, and Nunito is the default font.
- **FroggyKVM:** exiting a Java game now returns cleanly to PicoArch, and Java saves use `/mnt/sdcard/saves/j2me/`.
- Added the **SF3000HD without HDMI** install profile. Its firmware keeps stock sleep behavior.
- Added a startup guard around the standalone speaker helper.

## Other changes included since the v1.0.15 stable base

- Added Picante8, experimental Duke Nukem 3D, ClassiCube, Minecraft PE, Captain Claw, Diablo 1, Java Games, Nintendo DS, and experimental QPSX support.
- Added OpenLara and VVVVVV, then moved port setup guides and the Ports collection into their separate release. See the [Ports Collection](https://github.com/tzubertowski/TreeFrogUI_PortsCollection) for downloads and game data instructions.
- Improved translations, Arabic text rendering, volume and battery indicators, game handoff, audio startup, Java saves, ebook progress, and offline update recovery.

For a fresh installation, use the full archive and matching `install_first/<device>/` files. To update an existing installation, copy `update.zip` to the SD-card root and reboot. Back up your card first.
