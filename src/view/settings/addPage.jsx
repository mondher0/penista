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
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

function AddPage() {
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
    content:
      '<h1>Heading</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida id etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.</p><p></p><ul><li><p>unordered list item</p></li><li><p>unordered list itemunordered list itemunordered list itemunordered list itemunordered list itemunordered list itemunordered list itemunordered list item</p></li><li><p>unordered list item</p></li></ul>',
  });
  const [title, setTitle] = useState("Titre");
  const [slogan, setSlogan] = useState("Slogan");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
      const response = await axiosInstance.post(`${baseUrl}page/create/`, data);
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

  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <div className="form">
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
              {loading ? "Chargement..." : error ? "Erreur" : "Ajouter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPage;
