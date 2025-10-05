import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoClose } from 'react-icons/io5';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.dialog} onClose={onClose}>
        <Transition.Child as={Fragment} enter={styles.overlayEnter} enterFrom={styles.overlayEnterFrom} enterTo={styles.overlayEnterTo} leave={styles.overlayLeave} leaveFrom={styles.overlayLeaveFrom} leaveTo={styles.overlayLeaveTo}>
          <div className={styles.overlay} />
        </Transition.Child>

        <div className={styles.panelContainer}>
          <div className={styles.panelContent}>
            <Transition.Child as={Fragment} enter={styles.panelEnter} enterFrom={styles.panelEnterFrom} enterTo={styles.panelEnterTo} leave={styles.panelLeave} leaveFrom={styles.panelLeaveFrom} leaveTo={styles.panelLeaveTo}>
              <Dialog.Panel className={styles.panel}>
                <Dialog.Title as="h3" className={styles.title}>
                  {title}
                  <button onClick={onClose} className={styles.closeButton}>
                    <IoClose size={24} />
                  </button>
                </Dialog.Title>
                <div className={styles.body}>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
