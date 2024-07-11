import React from 'react';
import Modal from 'react-modal';

const ModalComponent = ({
    modalIsOpen,
    afterOpenModal,
    closeModal,
    customStyles,
    contentLabel,
    children
}) => {
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={contentLabel}
            >
                {children}
            </Modal>
        </div>
    )
}

export default ModalComponent;