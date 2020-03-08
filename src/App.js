import React from 'react';
import UserContext from 'UserContext';
import BasicLayout from 'pages/BasicLayout';
import './theme.scss';
import { getSelf } from 'services/user';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userContextValue: {
        user: {},
        updateUser: this.updateUser,
      },
    };
  }

  componentDidMount() {
    this.getUserSelf();
  }

  getUserSelf = async () => {
    try {
      const user = await getSelf();
      this.updateUser(user);
    } catch (resp) {
      if (resp.status === 401) {
        // TODO 未登录
      }
    }
  }


  updateUser = (user) => {
    this.setState({
      userContextValue: {
        user,
        updateUser: this.updateUser,
      },
    });
  }

  render() {
    const { userContextValue } = this.state;
    return (
      <UserContext.Provider value={userContextValue}>
        <BasicLayout />
      </UserContext.Provider>
    );
  }
}

export default App;
