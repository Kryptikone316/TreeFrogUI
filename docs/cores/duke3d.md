# Duke Nukem 3D

TreeFrogUI ships the SF3000 libretro port from [Synaps33/FroggyDuke](https://github.com/Synaps33/FroggyDuke).

Copy the legally owned game data into `roms/duke3d/`:

```text
roms/duke3d/
├── DUKE3D.GRP
├── DUKE.RTS
└── Start Duke Nukem 3D.duke3d
```

Select **Start Duke Nukem 3D** in the Duke Nukem 3D system. The marker is only a launcher; the core loads the two data files from the same folder.

The R36HD port is experimental: gameplay works, but audio is currently slow and choppy.

The open-source EDuke32 BUILD dependency is fetched at the pinned revision during the build and is not bundled into TreeFrogUI.
