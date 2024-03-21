import { DifficultyScore } from "../data";

type HighScoreLayoutProps = {
    highScoreData: DifficultyScore[];
};

function HighScoreLayout({ highScoreData }: HighScoreLayoutProps) {
    const HsLayout = highScoreData.map((highScore, index) => {
        const minutes = ("00" + highScore.time.minutes).slice(-2);
        const seconds = ("00" + highScore.time.seconds).slice(-2);

        return (
            <div className='flex justify-between items-center' key={index}>
                <p className='capitalize'>{highScore.name}</p>
                <p>
                    Flips: {highScore.flips} <br /> Time: {minutes}:{seconds}
                </p>
            </div>
        );
    });

    return <div className='divide-y divide-black'>{HsLayout}</div>;
}

export default HighScoreLayout;
