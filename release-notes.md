# TreeFrogUI v1.8.0_s prerelease

## Changes since v1.8.0_q

- **FrogUI rendering:** Restored the previous FreeType glyph rendering mode and 21 px default for sharper text, while keeping memory-mapped font loading.
- **FrogUI responsiveness:** Background theme-image prefetch pauses while navigating and resumes after 400 ms idle.
- **PICO-8:** Fixed `.p8`, `.png`, `.p8.png`, and `.png.p8` carts being hidden or sent to the wrong core across the `pico8`, `picante8`, `fake08`, and `retro8` folders.

For a fresh installation, use the full archive and matching `install_first/<device>/` files. To update an existing installation, copy `update.zip` to the SD-card root and reboot.
