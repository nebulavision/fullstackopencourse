const Notification = ({ message, isDisplayed, handleClose }) => {
    if(message === null) return null;

    return (
        <div className={ isDisplayed ? 'error' : 'error hiden' }>
            { message }
            <button onClick={handleClose}>X</button>
        </div>
    );
};

export default Notification;