/* Geometry from Eole's Panel Stack Splitter scripts. Coordinates are panel-local. */
var EoleLayout = {
    calculate: function (kind, w, h, s) {
        var panels = {};
        function place(name, visible, x, y, width, height) {
            panels[name] = { visible: !!visible, rect: [x, y, Math.max(0, width), Math.max(0, height)] };
        }
        var full = s.layout_state === 0;
        var view = s.main_panel_state;
        var side = [s.nowplayinglib_state, s.nowplayingplaylist_state, s.nowplayingbio_state, s.nowplayingvisu_state, s.nowplayinglyrics_state];
        var infos = [s.trackinfoslib_state, s.trackinfosplaylist_state, s.trackinfosbio_state, s.trackinfosvisu_state, s.trackinfoslyrics_state];
        if (kind === 'root') {
            var top = !s.compacttitlebar || !full ? 64 : s.compacttitlebar === 1 ? 36 : 50;
            var controls = full ? !s.mini_controlbar ? 72 : s.showtrackinfo_big ? 54 : 47 : s.showtrackinfo_small ? 51 : 43;
            var width = full ? s.rightplaylist_width : w;
            var infoHeight = infos[view] === 0 ? 0 : Math.min(Math.floor(h / 2), s.trackinfostext_state ? width + 41 : width);
            var body = h - top - controls;
            place('top_bar', true, 0, 0, w, top);
            place('controls', true, 0, h - controls, w, controls);
            ['library', 'playlists', 'artist_info', 'visualization', 'lyrics'].forEach(function (name, i) {
                place(name, full && view === i, 0, top, side[i] ? w - width : w, body);
            });
            place('now_playing', !full || side[view], full ? w - width : 0,
                full && infos[view] === 1 ? top + infoHeight : top, width, full ? body - infoHeight : body);
            place('track_infos', full && side[view] && infos[view] > 0, w - width,
                infos[view] === 1 ? top : h - controls - infoHeight, width, Math.min(infoHeight, body));
        } else if (kind === 'controls') {
            var cover = full ? s.coverpanel_state_big : s.coverpanel_state_mini;
            place('WSHcoverpanel', cover, 0, 0, h, h);
            place('WSHcontrols', true, cover ? h : 0, 0, cover ? w - h : w, h);
        } else if (kind === 'library') {
            var filter = s.libraryfilter_state;
            var left = filter ? s.libraryfilter_width : 0;
            place('WSHfilter', filter && !s.librarytree, 0, 0, left, h);
            place('WSHlibrary_tree', filter && s.librarytree, 0, 0, left, h);
            place('graphic_browser', true, left, 0, w - left, h);
        } else if (kind === 'playlists') {
            var manager = s.playlistpanel_width;
            place('playlist_manager', true, 0, 0, manager, h);
            place('playlist_panel', true, manager, 0, w - manager, h);
        } else if (kind === 'playlist_panel') {
            var state = s.filters_panel_state;
            var heights = [0, Math.floor(h / 10) * 2, Math.floor(h / 10) * 3, Math.floor(h / 5) * 2, Math.floor(h / 5) * 3, h];
            var filtersHeight = heights[state];
            place('filters', state > 0, 0, 0, w, filtersHeight);
            place('playlist', state < 5, 0, filtersHeight, w, h - filtersHeight);
        } else if (kind === 'filters') {
            var active = [s.filter1_state, s.filter2_state, s.filter3_state];
            // The original script always keeps filter 3 when filters 1 and 2 are off.
            if (!active[0] && !active[1]) active[2] = 1;
            var count = active.filter(Boolean).length, unit = Math.floor(w / count), x = 0, remaining = count;
            active.forEach(function (visible, i) {
                var width = visible ? --remaining === 0 ? w - x : unit : 0;
                place('filter' + (i + 1), visible, x, 0, width, h);
                x += width;
            });
        } else if (kind === 'playlist') {
            place('playlist_header', true, 0, 0, w, Math.min(40, h));
            place('ELPlaylist', true, 0, 40, w, h - 40);
        } else if (kind === 'artist_info') {
            place('bio', true, 0, 0, w, h);
        } else if (kind === 'lyrics') {
            // The header stays hidden: its script only passes the theme colours to ESLyric.
            place('lyrics_header', false, 0, 0, w, 0);
            place('ESLyric', true, 0, 0, w, h);
        } else throw new Error('Unknown Eole container: ' + kind);
        return panels;
    }
};

if (typeof module !== 'undefined') module.exports = EoleLayout;

if (typeof window !== 'undefined' && typeof eoleContainer !== 'undefined') {
    function layoutState() {
        var s = {};
        eoleStates.forEach(function (state) { s[state.name] = state.value; });
        return s;
    }
    function updateLayout() {
        var plan = EoleLayout.calculate(eoleContainer, window.Width, window.Height, layoutState());
        Object.keys(plan).forEach(function (name) {
            var child, p = plan[name];
            // columnsUI_eole_x64.fcl has no visualization child, only the _visualization layout does.
            try { child = window.GetPanel(name); } catch (e) { if (name !== 'visualization') throw e; return; }
            child.ShowCaption = false;
            child.Locked = true;
            child.Move(p.rect[0], p.rect[1], p.rect[2], p.rect[3]);
            child.Show(p.visible);
        });
        window.Repaint();
    }
    function on_size() { updateLayout(); }
    function on_notify_data(name, info) {
        var state = eoleStates.find(function (s) { return s.name === name; });
        if (state) state.value = info;
        if (state || name === 'eole_layout_changed') updateLayout();
    }
    function on_paint(gr) {
        var s = layoutState();
        var dark = s.layout_state ? s.darkmini_state : [s.darklib_state, s.darkplaylist_state,
            s.darkbio_state || s.darkbiostick_state, s.darkvisu_state, s.darklyrics_state][s.main_panel_state];
        var background = dark ? eoleContainer === 'filters' ? RGB(0, 0, 0) : RGB(30, 30, 30) : RGB(255, 255, 255);
        gr.FillSolidRect(0, 0, window.Width, window.Height, background);
    }
    updateLayout();
}
