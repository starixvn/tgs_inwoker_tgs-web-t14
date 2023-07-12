import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";
import { AppHistory } from "../../../../../history/History";
import config from "../../../../../config/config";
import Common from "../../../../../utils/Common";
const GameGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 200px);
  gap: 16px;
`;
const GameItem = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  border-radius: 25px;
  cursor: pointer;
`;
const GameProvider = styled.div`
  position: absolute;
  height: 40px;
  background-image: linear-gradient(0, #ffa200, white);
  padding-left: 15px;
  padding-top: 11px;
  border-bottom-right-radius: 25px;
  width: 80px;
  font-size: 14px;
  font-weight: bold;
`;
const GameImage = styled.img`
  width: 100%;
  height: 100%;
`;

const LoadGameButton = styled.div`
  cursor: pointer;
  margin: 40px auto;
  width: 300px;
  height: 50px;
  font-size: 22px;
  text-align: center;
  color: white;
  background-color: #ffa200;
  padding-top: 10px;
  border-radius: 5px;
`;

const GameGrid = ({ commonprops, games }) => {
  const navigate = (to) => {
    AppHistory.push(to);
  };

  const navigateToGame = (game) => {
    if (commonprops.token) {
      Common.closePreviousPopup();
      AppHistory.push(`/slots/play/${game.gpcode}/${game.id}`);
    } else {
      commonprops.showLogin(true);
    }
  };
  return (
    <React.Fragment>
      <GameGridContainer>
        {games.map((game) => (
          <GameItem key={game.id} onClick={() => navigateToGame(game)}>
            <GameProvider>{game.gpcode}</GameProvider>
            <GameImage
              src={`${
                config.sourceUrl
              }${game.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                game.code
              }.jpg`}
            ></GameImage>
          </GameItem>
        ))}
      </GameGridContainer>
      <LoadGameButton onClick={() => navigate("/slots")}>
        {i18n.t("showAllGames")}
      </LoadGameButton>
    </React.Fragment>
  );
};

export default GameGrid;
