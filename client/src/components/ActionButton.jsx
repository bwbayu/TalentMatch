import PropTypes from 'prop-types';

const ActionButton = ({ handleClick, text }) => {
    return (
        <div
            className="mt-5"
        >
            <button
                className="bg-blue-800 hover:bg-blue-200 text-white hover:text-blue-800 px-4 py-2 rounded font-semibold"
                onClick={handleClick}
            >
                {text}
            </button>
        </div>
    )
}

ActionButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
}

export default ActionButton