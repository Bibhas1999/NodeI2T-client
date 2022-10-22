import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Tooltip,
  Overlay,
} from "react-bootstrap";
import no_img from "../components/images/no-image.jpg";
import axios from "axios";
import { useState,useRef } from "react";
function Form() {
  const [preview, setPreview] = useState(no_img);
  const [loading, setLoading] = useState("Text will appear here..");
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const fileUpload = (e) => {
    setText("");
    setLoading("Fetching text...");
    e.preventDefault();
    console.log(e.target.files);
    const [file] = e.target.files;
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    const headers = {
      'Access-Control-Allow-Origin': '*',
    }
    axios.post("https://nodei2tapi.herokuapp.com/upload", formData, {headers}).then((res) => {
      setText(res.data.text);
      setLoading("");
    });
  };
  const copyToClipBoard = () => {
    setShow(!show)
    navigator.clipboard.writeText(text);
    
  };
  return (
    <>
      <Container>
        <Row className="my-3">
          <h3 className="text-center text-success my-4">
            Extract Text From Image
          </h3>
          <Col className="bg-default p-0 mx-1">
            <input
              type="file"
              name="image"
              id="image"
              className="d-none"
              onChange={(e) => fileUpload(e)}
            />
            <label
              className="d-flex justify-content-center align-items-center"
              htmlFor="image"
              style={{
                height: "100%",
                border: "2px solid silver",
                borderStyle: "dashed",
                width: "100%",
                backgroundColor: "#ffffff",
              }}
            >
              <img
                src={preview}
                id="preview"
                alt="preview"
                style={{ height: "300px", width: "300px" }}
              />
            </label>
          </Col>
          <Col
            className=""
            style={{ backgroundColor: "#f7f7f7", border: "1px solid silver" }}
          >
            <Card style={{ border: "none" }}>
              <Card.Header style={{ border: "none" }}>
                <Button ref={target}
                  variant="outline-success"
                  className="float-right"
                  style={{ float: "right" }}
                  onClick={() => copyToClipBoard()}
                >
                  Copy
                </Button>
                <Overlay target={target.current} show={show} placement="top">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Copied
                    </Tooltip>
                  )}
                </Overlay>
              </Card.Header>
            </Card>
            <textarea
              className=""
              style={{
                backgroundColor: "#f7f7f7",
                resize: "none",
                border: "none",
                width: "100%",
                outline: "none",
              }}
              cols={20}
              rows={20}
              placeholder={loading}
              value={text}
            ></textarea>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Form;
