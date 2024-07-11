import React from 'react';
import Modal from 'react-modal';

// Ensure Modal is only set up in the browser environment
if (typeof window !== 'undefined') {
  Modal.setAppElement('#___gatsby');
}

// Optionally, you can also export or include other browser APIs setup here
export const onClientEntry = () => {
  // Additional setup if needed
};
