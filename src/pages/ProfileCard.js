import React, { useContext } from 'react';
import UserContext from 'UserContext';
import { useHistory } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

export default function ProfileCard() {
  const { user } = useContext(UserContext);
  const history = useHistory();

  function handleNewThread() {
    history.push('/thread/new');
  }

  const loggedIn = !!user.id;

  return (
    <Card data-test="profile">
      <Card.Body>
        {
          loggedIn ? (
            <div>
              <div className="mb-4">
                <img
                  width={64}
                  height={64}
                  className="mr-2"
                  src={user.avatar_url}
                  alt={`avatar of ${user.username}`}
                />
                <span className="d-inline-block align-top font-weight-bold">{user.username}</span>
              </div>
              <Button
                variant="outline-dark"
                block
                onClick={handleNewThread}
              >
                发帖
              </Button>
            </div>
          ) : (
            <div className="d-flex">
              <Button
                className="flex-grow-1 mr-1"
                variant="outline-dark"
                onClick={() => history.push('/auth/login')}
              >
                登录
              </Button>
              <Button
                className="flex-grow-1 ml-1"
                variant="primary"
                onClick={() => history.push('/auth/register')}
              >
                注册
              </Button>
            </div>
          )
        }
      </Card.Body>
    </Card>
  );
}
