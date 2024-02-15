const SERVER_URL = "http://localhost:4000";

const clearAllNotes = async () => {
  const delRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(delRes.status).toBe(200);
}

test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

test("/postNote - Post a note", async () => {
  clearAllNotes();
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  clearAllNotes();
  const getRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(getRes.status).toBe(200);
  const getResBody = await getRes.json();
  expect(getResBody.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  clearAllNotes();
  const noteData = [["a", "a"], ["b", "b"]];
  for (let [t, c] of noteData) {
    let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: t,
        content: c,
      }),
    });
    expect(postNoteRes.status).toBe(200);
  }
  
  const getRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(getRes.status).toBe(200);
  const getResBody = await getRes.json();
  expect(getResBody.response.length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
  clearAllNotes();
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "a",
      content: "a",
    }),
  });
  expect(postNoteRes.status).toBe(200);
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const delRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(delRes.status).toBe(200);
  const delResBody = await delRes.json();
  expect(delResBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  clearAllNotes();
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "a",
      content: "a",
    }),
  });
  expect(postNoteRes.status).toBe(200);
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "b",
      content: "b",
    }),
  });
  expect(patchNoteRes.status).toBe(200);
  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just title", async () => {
  clearAllNotes();
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "a",
      content: "a",
    }),
  });
  expect(postNoteRes.status).toBe(200);
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "b",
    }),
  });
  expect(patchNoteRes.status).toBe(200);
  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just content", async () => {
  clearAllNotes();
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "a",
      content: "a",
    }),
  });
  expect(postNoteRes.status).toBe(200);
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "b",
    }),
  });
  expect(patchNoteRes.status).toBe(200);
  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {
  clearAllNotes();
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "a",
      content: "a",
    }),
  });
  expect(postNoteRes.status).toBe(200);

  const delRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(delRes.status).toBe(200);
  const delResBody = await delRes.json();
  expect(delResBody.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  clearAllNotes();
  const noteData = [["a", "a"], ["b", "b"], ["c", "c"]];
  for (let [t, c] of noteData) {
    let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: t,
        content: c,
      }),
    });
    expect(postNoteRes.status).toBe(200);
  }

  const delRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(delRes.status).toBe(200);
  const delResBody = await delRes.json();
  expect(delResBody.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  clearAllNotes();
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "a",
      content: "a",
    }),
  });
  expect(postNoteRes.status).toBe(200);
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const updateNoteRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: "#FF0000",
    }),
  });
  expect(updateNoteRes.status).toBe(200);
  const updateNoteBody = await updateNoteRes.json();
  expect(updateNoteBody.response).toBe('Note color updated successfully.');


});