import { v4 } from "uuid";

const fakeDB = {
  user1: "qwe123",
  user2: "asdzxc",
};

class FakeServer {
  constructor() {
    this._nextAuthCode = v4();
    this._subscribers = [];
    this._nextToken = null;
    setInterval(() => {
      this._nextAuthCode = v4();
      this._notify2FA();
    }, 1000 * 10);
  }

  subscribe2FA = (subscriber) => {
    this._subscribers.push(subscriber);
    subscriber(this._nextAuthCode);
  };

  unsubscribe2FA = (subscriber) => {
    this._subscribers = this._subscribers.filter((sub) => sub !== subscriber);
  };

  _notify2FA = () => {
    this._subscribers.forEach((sub) => sub(this._nextAuthCode));
  };

  authorize = (name, password) => {
    return new Promise((resolve, reject) => {
      if (!name || !password) {
        reject("you should provide botth name and password");
      }
      if (fakeDB[name] === password) {
        this._nextToken = v4();
        resolve(this._nextToken);
      }
      reject("invalid name or password");
    });
  };

  send2FACode = (code, token) => {
    if (code === this._nextAuthCode && token === this._nextToken) {
      return Promise.resolve("success");
    }
    return Promise.resolve("invalid 2FA code");
  };
}

export const fakeServer = new FakeServer();
