// import { useState } from "react"

type CardProps = {
    name: string;
    id: string;
    isFlipped: boolean;
    flipCard: (id: string, name: string) => void;
};

function Card({ name, id, isFlipped, flipCard }: CardProps) {
    // const [flipped, setFlipped] = useState(false)

    // function handleClick() {
    //     console.log('clicked')
    //     flipCard(id)
    // }

    function handleClick() {
        if (isFlipped) return;

        flipCard(id, name);
    }

    return (
        // container
        <div
            className='w-[70px] h-[100px] lg:w-[100px] lg:h-[150px] card  overflow-hidden hover:cursor-pointer'
            onClick={handleClick}>
            {/* card inner */}
            <div
                className={`relative perspect-none transition preserve w-full h-full ${
                    isFlipped && "rotate-card"
                }`}>
                {/* front */}
                <div className='w-full h-full absolute top-0 left-0  visibility'>
                    <img
                        src='/1.png'
                        alt=''
                        className='card-img w-full h-full'
                    />
                </div>
                {/* back */}
                <div className='w-full h-full absolute top-0 left-0 visibility rotate-card'>
                    <img src='/2.png' alt='' />
                    <div className='w-full h-full flex justify-center items-center bg-red-600 absolute top-0'>
                        <img src={`/${name}.svg`} alt='' width='50px' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
