import './BulletinHost.scss';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  subscribeToBulletin,
  unsubscribeToBulletin,
  deleteBulletin,
} from '../../../../store/actions/bulletin.actions';
import { selectBulletin, selectIsUnsubBulletin } from '../../../../store/reducers';
import { useRouteMatch } from 'react-router-dom';
import { Spinner, Button, Alert } from 'reactstrap';
import { BulletinDetails } from '../../BulletinDetails/BulletinDetails';
import { QueueHost } from '../QueueHost/QueueHost';
import { ConfirmModal } from '../../../ui/ConfirmModal/ConfirmModal';

function renderAlert() {
  return (
    <Alert color="dark">
      <h3>Lost connection to the island!</h3>
      <p>
        Whoopsie! Try to refresh the page once or twice,{' '}
        <strong>unless you have deleted the island</strong>.
      </p>
    </Alert>
  );
}

export const BulletinHost = () => {
  const match = useRouteMatch<{ bulletinId: string }>();
  const bulletinId = match.params.bulletinId;
  const bulletin = useSelector(selectBulletin);
  const isUnsubscribed = useSelector(selectIsUnsubBulletin);
  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(subscribeToBulletin(bulletinId));

    return () => {
      dispatch(unsubscribeToBulletin(bulletinId));
    };
  }, [bulletinId, dispatch]);

  if (!bulletin) {
    return (
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-6">
          {isUnsubscribed ? renderAlert() : <Spinner type="grow" />}
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8 col-xl-6">
        <div className="bulletin-host">
          {isUnsubscribed ? renderAlert() : null}
          <BulletinDetails bulletin={bulletin} />
          <p className="d-flex justify-content-end">
            <Button color="light">Edit island</Button>
            <Button color="danger" className="ml-3" onClick={() => setIsDeleting(true)}>
              Delete island
            </Button>
          </p>
          <QueueHost bulletin={bulletin} />
          <p className="f6 text-right">
            Image credits:{' '}
            <a
              href="https://dribbble.com/shots/11137115-Turnip"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cherryink
            </a>
          </p>
        </div>
      </div>

      {isDeleting ? (
        <ConfirmModal
          isOpen={isDeleting}
          onCancel={() => setIsDeleting(false)}
          onConfirm={() => {
            dispatch(deleteBulletin(bulletinId));
            setIsDeleting(false);
          }}
        >
          Deleting the island will remove it from the website and no further people will receive
          your DODO code.
        </ConfirmModal>
      ) : null}
    </div>
  );
};