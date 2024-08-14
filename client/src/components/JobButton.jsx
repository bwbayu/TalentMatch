import PropTypes from 'prop-types';

const JobButton = ({ handleClick, title, idx, similarity }) => {
    const formattedSimilarity = similarity.toFixed(2);
    return (
        <div
            className="mt-5"
        >
            <button
                className="bg-darkBlueGray hover:bg-mintGreen text-white hover:text-black px-4 py-2 rounded font-semibold w-full"
                onClick={handleClick}
            >
                <div className='flex flex-row gap-2'>
                    {idx}. {title} - Similarity {formattedSimilarity}
                </div>
            </button>
        </div>
    )
}

JobButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    similarity: PropTypes.number.isRequired,
}

export default JobButton