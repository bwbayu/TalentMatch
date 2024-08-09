import PropTypes from 'prop-types';

const JobButton = ({ handleClick, title, idx, similarity }) => {
    return (
        <div
            className="mt-5"
        >
            <button
                className="bg-blue-800 hover:bg-blue-200 text-white hover:text-blue-800 px-4 py-2 rounded font-semibold w-full"
                onClick={handleClick}
            >
                <div className='flex flex-row gap-2'>
                    {idx}. {title} - Similarity {similarity}
                </div>
            </button>
        </div>
    )
}

JobButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    similarity: PropTypes.string.isRequired,
}

export default JobButton