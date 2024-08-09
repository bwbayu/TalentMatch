import PropTypes from 'prop-types';

const ActionButton = ({ handleClick, text, disabled = false }) => {
    return (
        <div
            className="mt-5"
        >
            <button
                className="bg-darkBlueGray hover:bg-mintGreen text-white hover:text-black px-4 py-2 rounded font-semibold"
                onClick={handleClick}
                disabled={disabled}
            >
                {text}
            </button>
        </div>
    )
}

ActionButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
}

export default ActionButton