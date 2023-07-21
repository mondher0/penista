/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import "../events/AddEventPage.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";

function EditSettingsPage() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
  });
  const { id } = useParams();
  const [title, setTitle] = useState("Titre");
  const [slogan, setSlogan] = useState("Slogan");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // New state variable to store the editor content
  const [editorContent, setEditorContent] = useState("");

  // New state variable to keep track of whether content has been loaded
  const [contentLoaded, setContentLoaded] = useState(false);

  // get single page
  const getSinglePage = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}page/${id}/`);
      console.log(response);
      setTitle(response.data.data.title);
      setSlogan(response.data.data.slogan);

      // Update the editor content with the fetched data
      setEditorContent(response.data.data.content); // Assuming the content field from the backend response is named "content"

      // Mark content as loaded
      setContentLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(editor.getHTML());
      setLoading(true);
      setError(false);
      const data = {
        title: title,
        slogan: slogan,
        content: editor.getHTML(),
      };
      const response = await axiosInstance.put(
        `${baseUrl}page/update/${id}/`,
        data
      );
      console.log(response);
      if (response.data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePage();

    // Set the editor content once the component mounts and the content is loaded
    if (editor && contentLoaded) {
      editor.commands.setContent(editorContent);
    }
  }, [editor, contentLoaded]);

  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <div className="form">
          {contentLoaded ? ( // Render the editor only when the content is loaded
            <form onSubmit={handleSubmit}>
              <RichTextEditor
                editor={editor}
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <input
                  type="text"
                  id="gratuit"
                  name="gratuit"
                  required
                  value={title}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    fontFamily: "Roboto, sans-serif",
                  }}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  id="gratuit"
                  name="gratuit"
                  required
                  value={slogan}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    fontFamily: "Roboto, sans-serif",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  onChange={(e) => setSlogan(e.target.value)}
                />
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
              </RichTextEditor>
              <button
                className="add-value submit"
                onClick={() => {
                  console.log(editor.getHTML());
                }}
              >
                {loading ? "Chargement..." : error ? "Erreur" : "Modifier"}
              </button>
            </form>
          ) : (
            // Render a placeholder or loading message while waiting for content
            <p>Loading editor...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default EditSettingsPage;
