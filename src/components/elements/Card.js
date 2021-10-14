const Card = ({ info }) => {
    return (
        <div className='card'>
            <embed className='w-full object-center h-32 sm:h-42 md:h-52 lg:h-60' src={process.env.REACT_APP_MEDIA_URL + info.file_name} alt='' />

            <div className='m-2'>
                <a target="_blank" href={process.env.REACT_APP_MEDIA_URL + info.file_name} download> <p className='text-md text-green-700 block break-words'>{info.file_name.slice(24)}</p></a>
            </div>

        </div>
    );
}

export default Card;