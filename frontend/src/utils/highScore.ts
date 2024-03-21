import { HighScore, Time } from "../data";

export const compareHighScores = (
    current: HighScore,
    old: HighScore | undefined
) => {
    if (!old) {
        return true;
    }

    const currentTime = getTotalSeconds(current.time);
    const oldTime = getTotalSeconds(old.time);
    //highscore is based on how quick and fast its done so its less than
    return (
        old.flips === 0 ||
        (current.flips <= old.flips && currentTime <= oldTime)
    );
};

function getTotalSeconds(time: Time) {
    const { minutes, seconds } = time;
    return minutes * 60 + seconds;
}
