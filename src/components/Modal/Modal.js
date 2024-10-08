import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ModalComponent = ({
    modalIsOpen,
    afterOpenModal,
    closeModal,
    customStyles,
    contentLabel,
    children
}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={contentLabel}
        >
            {children}
        </Modal>
    )
}

export default ModalComponent;