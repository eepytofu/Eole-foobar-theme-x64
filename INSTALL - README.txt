# Eole Foobar theme

This is a skin for the [foobar2000](https://www.foobar2000.org) audio player.
This theme requires Foobar2000 64bit, version 2.26 or newer.
Follow the instructions below to install it properly.

## Installation

0. Close foobar.

1. Download this [github repository](https://github.com/eepytofu/Eole-foobar-theme-x64/zipball/master/) and copy the `themes` folder into your foobar profile directory.
   - STANDARD foobar2000 installation: your foobar profile directory is in here: `%AppData%\foobar2000-v2`
   - PORTABLE foobar2000 installation: your foobar profile directory is in a folder named "`profile`" inside your installation directory.

2. Run foobar, download these components and install them from `File` > `Preferences` > `Components` > `Install...`, then restart foobar.
   - [Columns UI](https://www.foobar2000.org/components/view/foo_ui_columns)
   - [JSplitter](https://github.com/dima-lur/jsplitter/releases) (4.3 or newer)
   - [ESLyric](https://github.com/ESLyric/release/releases)
   - [Playback Statistics](https://www.foobar2000.org/components/view/foo_playcount)

3. Choose `ColumnUI` as user interface (from the prompt, or in `File` > `Preferences` > `Display`).

4. From the Columns UI settings in `File` > `Preferences` > `Display` > `Columns UI`, click on `Import`, and select the following file: `[FOOBAR_PROFILE_DIRECTORY]\themes\eole\columnsUI_eole_x64.fcl`.

## Optional

If you want the `Visualization` tab, install the [MilkDrop 2](https://www.foobar2000.org/components/view/foo_vis_milk2) component too, copy the `milkdrop2` folder into your foobar profile directory, and import `columnsUI_eole_x64_visualization.fcl` instead.

If you use Last.fm, install the [Enhanced Playback Statistics](https://www.foobar2000.org/components/view/foo_enhanced_playcount) component and set your username in its preferences, then pick `Skin settings` > `Play counts` > `Last.fm` from the `Foobar` button to show your scrobble counts instead of the local play counts.

If you want my own setup (blurred cover art backgrounds, round covers, compact title bar, no ratings, no `Visualization` tab), copy the `eslyric-data` folder into your foobar profile directory too, and import `columnsUI_eole_x64_eepytofu.fcl` instead.

If you want some extra polish you can change the systray icon: Click the `Foobar` button in the top left and navigate to `File` > `Preferences` > `Display` > `Columns UI`. Go to the `Notification area` tab and tick `Use custom icon`, then click `Select icon...` and select the file `[FOOBAR_PROFILE_DIRECTORY]\themes\eole\img\systray icons\white\uniEC4F.ico` (or any of the alternative icons in this folder).

That's it! Enjoy your music!

## Useful to know

- Eole uses a cover cache. The cover cache is built little by little: when a cover is displayed, if it isn't stored yet in the cache, it will be added to it. So on first display of any cover, it will be a little bit slow, but it will be a lot faster on subeequent displays. This cache is based on the `%album artist%` and `%album%` tags. After updating an existing cover, you must manually refresh it in foobar. Just right click on the cover needing to be refreshed and click `Refresh this image`.

- The library browser panel has an option to load every cover from the image cache at startup, which is enabled by default and allows to browse your library without waiting for the covers to load. Foobar memory usage is higher when this option is enabled, because all the covers are loaded into memory. This option has an effect only once the image cache is already built, which is done little by little: when a cover is displayed, if it isn't stored yet in the cache, it will be added to the cache.

- Most panels have a settings menu which can be accessed with a right click. You can also look for the hamburger (3 dots) menu icons. And if you want to get your hands dirty and edit a panel, press `SHIFT` when right clicking and click `Configure` to see which files contain the related scripts.

## Credits
- [dima-lur](https://github.com/dima-lur): JSplitter, which powers most of this theme [foo_uie_jsplitter](https://github.com/dima-lur/jsplitter)
- [TheQwertiest](https://github.com/TheQwertiest): original [foo_spider_monkey_panel](https://github.com/TheQwertiest/foo_spider_monkey_panel)
- [marc2003](https://github.com/marc2k3): original [foo_jscript_panel](https://github.com/marc2k3/foo_jscript_panel)
- [T.P. Wang](https://hydrogenaud.io/index.php?action=profile;u=44175): original [WSH Panel Mod](https://code.google.com/archive/p/foo-wsh-panel-mod).
- [Br3tt aka Falstaff](https://www.deviantart.com/br3tt): original code for most of the panels
- [WilB](https://hydrogenaud.io/index.php?action=profile;u=33113): original code of the library tree panel, and biography panel