export default {
    getCurrentMusic(state) {
        return state.currentMusic;
    },
    playAll(state) {
        return state.playAll;
    },
    currentMusicIndex(state) {
        return state.currentMusicIndex
    },
    currentMusicTime(state) {
        return state.currentMusicTime
    },
    playerDetailShow(state){
        return state.playerDetailShow;
    }
}