import React, { useEffect, useState } from "react";
import "./App.css";
import ReactPlayer from "react-player";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Header, UserList, VideoList } from "./components";
import { useSocket } from "./contexts/socket";

function App() {
  const socket = useSocket();
  // controle do modal de nome de usuario
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useState<string>();
  const [localUserList, setUserList] = useState<any[]>([]);
  const [localVideoList, setVideoList] = useState([
    "https://www.youtube.com/watch?v=ERFXravD0AU",
  ]);
  const [videoURL, setUrl] = useState("");
  const [secondsVideo, setSecondsVideo] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  let timeVideoAux: number = 0;

  useEffect(() => {
    socket.on("disconnect", (userList: any[]) => {
      setUserList(userList);
    });

    // Recebe lista de usuarios
    socket.on("receiveUserList", (userList: any[]) => {
      if (userList.length) {
        setUserList(userList);
      }
    });

    // Recebe mensagem para iniciar/pausar video
    socket.on("receivePlayOrPause", (data: any) => {
      if (data === "play") {
        setPlayVideo(true);
      } else {
        setPlayVideo(false);
      }
    });

    socket.on("receiveAddVideo", (videoList: any) => {
      if (videoList) {
        addVideo(videoList);
      }
    });

    socket.on("receiveSyncVideo", (timeSeconds: number) => {
      setSecondsVideo(timeSeconds);
    });

    socket.on("receiveEndVideo", (videoList: any) => {
      endVideo(videoList);
    });
    socket.emit("getUserList");
    socket.emit("getVideoList");
    handleOpenDialog();
  }, [socket]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    if (!userName) {
      setUserName("Daniel do Sync");
    }
    socket.emit("addUser", userName);
    setOpen(false);
  };

  const handlePlayVideo = () => {
    socket.emit("playOrPause", "play");
  };

  const handlePauseVideo = () => {
    socket.emit("playOrPause", "pause");
  };

  const handleAddVideo = (event: any) => {
    //Para evitar que o navegador atualize sempre q fizer a requisição
    event.preventDefault();
    socket.emit("addVideo", videoURL);
  };

  const handleEndVideo = () => {
    socket.emit("endVideo");
  };

  const handleSyncVideo = () => {
    socket.emit("syncVideo", timeVideoAux);
  };

  const handleProgressVideo = (event: any) => {
    timeVideoAux = event.playedSeconds;
  };

  const addVideo = (videoList: Array<any>) => {
    if (videoList) {
      setVideoList(videoList);
    }
  };

  const endVideo = (videoList: Array<any>) => {
    setVideoList(videoList);
    setUrl(videoList[0]);
  };

  const handleChangeUrl = (event: any) => {
    setUrl(event.target.value);
  };

  const handleChangeUserName = (event: any) => {
    setUserName(event.target.value);
  };

  return (
    <div className="App">
      <Header/>

      <div className="body">
        <UserList userList={localUserList}/>

        <div className="youtubePlayer">
          <div className="player">
            <ReactPlayer
              onProgress={handleProgressVideo}
              playing={playVideo}
              controls={true}
              url={localVideoList[0] + "?t=" + secondsVideo}
              onPlay={handlePlayVideo}
              onPause={handlePauseVideo}
              onEnded={handleEndVideo}
            />
          </div>
          <div className="controls">
            <form onSubmit={handleAddVideo}>
              <TextField
                id="standard-basic"
                label="URL Video:"
                onChange={handleChangeUrl}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddVideo}
                style={{ height: "100%" }}
              >
                Adicionar
              </Button>
            </form>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEndVideo}
            >
              Proximo
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSyncVideo}
            >
              Sincronizar
            </Button>
          </div>
        </div>

        <VideoList videoList={localVideoList}/>
      </div>

      {/* DIALOG PARA NOME DE USUARIO */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nome de Usuario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome de Usuario"
            type="text"
            fullWidth
            onChange={handleChangeUserName}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!userName}
            onClick={handleCloseDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/* FIM DIALOG PARA NOME DE USUARIO */}
    </div>
  );
}

export default App;
