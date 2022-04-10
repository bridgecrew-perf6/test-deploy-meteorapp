import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LinksCollection } from '../api/links';

export const Info = () => {
  const links = useTracker(() => {
    return LinksCollection.find().fetch();
  });

  const [info, setInfo] = React.useState({
    title: '',
    url: '',
    createdAt: new Date(),
  });

  const [updateinfo, setUpdateinfo] = React.useState({
    title: '',
    url: '',
  });
  const [show, setShow] = React.useState(false);
  const remove = id => {
    LinksCollection.remove({ _id: id });
  };
  const add = () => {
    LinksCollection.insert(info);
  };
  const update = id => {
    LinksCollection.update({ _id: id }, updateinfo);
    setShow(false);
  };
  return (
    <>
      <div>
        <h2>Learn Meteor!</h2>
        <ul>
          {links.map(link => (
            <li key={link._id}>
              <a href={link.url} target="_blank">
                {link.title}
              </a>
              <button onClick={() => remove(link._id)}>Delete</button>
              <button onClick={() => setShow(true)}>Update</button>
              {show ? (
                <>
                  <input
                    type="text"
                    placeholder="title"
                    onChange={e => {
                      setUpdateinfo({ ...updateinfo, title: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="url"
                    onChange={e => {
                      setUpdateinfo({ ...updateinfo, url: e.target.value });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      update(link._id);
                    }}
                  >
                    Do it
                  </button>
                </>
              ) : null}
            </li>
          ))}
        </ul>

        <div>
          <input
            type="text"
            placeholder="title"
            onChange={e => {
              setInfo({ ...info, title: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="url"
            onChange={e => {
              setInfo({ ...info, url: e.target.value });
            }}
          />
          <button type="button" onClick={add}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};
