# TreeFrogUI v1.8.0_k prerelease

## Changes since v1.8.0_i

- **Nintendo DS:** the bundled DSperate build adds a blocking completion wait for 2D worker jobs after its short spin, and enables automatic thread pinning only when the host reports at least four usable cores. The MIPS JIT avoids reloading cached guest registers after a successful indirect dispatch, preserves the host `$s7` register, keeps a patchable branch and delay slot on the same page, and checks the exact ARM9/ARM7 IE/IF interrupt poll before generic block-memory handling. Scalar untextured flat-color spans reuse their shaded color, and aligned fixed-source DMA runs can fill direct-memory destinations. The IE/IF fast path keeps mapped memory priority. QEMU output checks match saved NSMB and Castlevania baselines, and targeted tests cover the JIT, DMA, flat-color and worker paths. These changes have not established a hardware speed gain or proven that multi-second hardware stalls are fixed.
- **FrogUI:** PICO-8 now uses Picante8 in the `pico8` folder by default. Fake-08 and Retro8 have their own `fake08` and `retro8` folders, while existing `picante8` carts remain supported. The menus distinguish the alternatives and share PICO-8 artwork and icons. Nintendo DS sidecar files are filtered from the game list.
- **PicoArch and standalone launch:** exiting a PicoArch standalone port can hand a queued game launch directly back to the launcher, avoiding an extra FrogUI restart. The launcher polls every 200 ms and reduces repeated process snapshots written to the SD card. Current PicoArch changes also remove the custom speaker-amplifier GPIO gate and let the stock device audio path manage the amplifier; this can restore the R36SX's stock idle speaker noise.
- **Device launcher:** SF3000, R36SX and related profile launchers no longer use the standalone speaker helper. The helper is removed from the release build and launcher deployment can update the profile's `zhijack.sh` while deleting an old helper from the card. The launcher now accepts an R36SX TreeFrogUI identity when the legacy `cubegm/icube` file is absent.
- Updated PICO-8 folder/setup documentation and clarified install, artwork and theme-pack instructions.

## Other changes included since the v1.0.15 stable base

- Added Picante8, experimental Duke Nukem 3D, ClassiCube, Minecraft PE, Captain Claw, Diablo 1, Java Games, Nintendo DS and experimental QPSX support. Added OpenLara and VVVVVV under **Games → Ports**, with setup guides for user-supplied game data; ports have a separate release collection.
- Added support profiles and install guidance for R36SX/R36 HD variants, SF3000, SF3000 HD, SF3000HD without HDMI, SF3100, SF3500 and GB350.
- Added FrogUI menu-frame screenshots, Nunito, improved translations and Arabic text rendering, shared volume and battery indicators, and PICO-8 system alternatives.
- Improved game handoff, PicoArch audio startup and underrun handling, Java saves and game exit, ebook progress and page turning, and offline update recovery.

For a fresh installation, use the full archive and matching `install_first/<device>/` files. To update an existing installation, copy `update.zip` to the SD-card root and reboot. Back up your card first.
