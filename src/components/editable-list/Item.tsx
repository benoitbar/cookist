import { createAnimation, createGesture } from '@ionic/core';
import { useIonModal } from '@ionic/react';
import React from 'react';

interface Props<T> {
  children: React.ReactElement;
  item: T;
  Modal: any;
  onEdit: (oldItem: T, newItem: T) => void;
  onSwipe?: (item: T) => void;
}

function clamp(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

function getStep(e: any, width: number) {
  return clamp(0, Math.abs(e.deltaX) / width, 1);
}

export const EditableListItem: React.FC<Props<any>> = <T,>({
  children,
  item,
  Modal,
  onEdit,
  onSwipe,
}: Props<T>) => {
  const itemRef = React.useRef<any>();

  const [present, dismiss] = useIonModal(Modal, {
    item,
    onDismiss: (data: T) => {
      onEdit(item, data);
      dismiss();
    },
  });

  function handleContextMenu(evt: React.MouseEvent<HTMLDivElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    present({
      cssClass: 'sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
  }

  React.useLayoutEffect(() => {
    if (typeof onSwipe === 'function') {
      const ionItem = itemRef.current?.querySelector('ion-item');

      let swipe: any;

      const hide = createAnimation()
        .addElement(ionItem)
        .duration(200)
        .fromTo('height', `49px`, '0px')
        .onFinish(() => onSwipe(item));

      const gesture = createGesture({
        el: ionItem,
        threshold: 1,
        gestureName: 'drag',
        onStart: evt => {
          swipe = createAnimation()
            .addElement(ionItem)
            .duration(400)
            .fromTo(
              'transform',
              'translateX(0)',
              evt.deltaX > 0 ? 'translateX(100%)' : 'translateX(-100%)'
            )
            .progressStart(true);
        },
        onMove: evt => {
          swipe.progressStep(getStep(evt, ionItem.clientWidth));
        },
        onEnd: evt => {
          gesture.enable(false);

          const step = getStep(evt, ionItem.clientWidth);
          const shouldComplete = evt.velocityX >= 0.1 || step >= 0.5;

          swipe.progressEnd(shouldComplete ? 1 : 0, step);

          swipe.onFinish(() => {
            gesture.enable(!shouldComplete);
            if (shouldComplete) {
              hide.play();
            }
          });
        },
      });

      gesture.enable(true);

      return () => {
        gesture.destroy();
      };
    }
  }, []);

  return (
    <div
      onContextMenu={handleContextMenu}
      ref={itemRef}
      style={{ backgroundColor: 'red' }}
    >
      {children}
    </div>
  );
};
