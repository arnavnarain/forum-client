import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  TextField,
  View,
} from '@aws-amplify/ui-react';
import { listNotes } from "../../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../../graphql/mutations";

import { ThreadCard } from '../../components/thread-card/ThreadCard'
import { Auth } from 'aws-amplify';

const Home = () => {
  const [notes, setNotes] = useState([]);

  const username = Auth.user.username;

  useEffect(() => {
    fetchNotes();
  }, []);

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
      ownerId: username,
      upvotes: [],
      downvotes: []
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  return (
    <View className="App">
      <Heading level={1}>Bulletin Board</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Title"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
          />
          <Button type="submit" variation="primary">
            Create Thread
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Threads</Heading>
      <center>
        <View>
          {notes.map((note) => (
            <ThreadCard title={note.name} content = {note.description} image = {note.image} ownerId = {note.ownerId} createdAt = {note.createdAt} upvotes={note.upvotes} id={note.id} downvotes={note.downvotes} />
          ))}
        </View>
      </center>
    </View>);
}

export { Home } 