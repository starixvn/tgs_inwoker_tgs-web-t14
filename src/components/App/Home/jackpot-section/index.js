import React, { useEffect, useState } from "react";
import { AppHistory } from "../../../../history/History";
import styled from "styled-components";
import {
  GameTypeEnum,
  SlotFilterType,
} from "../../../../api-services/utils/Enum";
import Common from "../../../../utils/Common";
import SlotGenerator from "../slot-generator";
import Winners from "./winners";
import GameGrid from "./game-grid";
import { GameService } from "../../../../api-services/services/GameService";
import i18n from "../../../../utils/i18n";
import JackpotContainer from "./jackpot-content";
const Container = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 1280px;
  margin: 40px auto 40px auto;
  font-size: 44px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
`;

const JackpotHolder = styled.div`
  position: relative;
  margin-bottom: 0px;
`;

const JackpotContentWorkingSpace = styled.div`
  width: 1280px;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: 10px;

  margin: 0 auto;
`;

const TopContent = styled.div`
  grid-area: topContent;
  position: absolute;
  color: white;
  display: flex;
  height: 150px;
  width: 1280px;

  font-size: 75px;
  align-items: center;
  letter-spacing: 14px;
  font-weight: 500;
  justify-content: space-evenly;
  font-weight: bold;
`;

const BottomContent = styled.div`
  display: flex;
`;

const TextHolder = styled.div`
  border-radius: 8px;
  padding: 0 10px 0 10px;
  text-align: center;
  font-size: 55px;
  height: 80px;
  display: flex;

  ${({ hide }) => {
    return hide
      ? `
   font-size: 65px;
   padding: 0 0 0 0px;
   width: 20px;
   align-items: flex-end;
  
  `
      : ` background: #000326;font-size: 75px;
      align-items: center; width: 75px;`;
  }};
  color: ${({ theme }) => theme.primary};
  filter: drop-shadow(2px 5px 15px #00000033);
  border-radius: 20px;

  justify-content: center;
  margin: 7px;
`;

const TextContent = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Digit = styled.div`
  width: 60px;
`;

const SlotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GameEntranceWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  gap: 20px;
`;

const GameEntranceDisplayer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: #00000099;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const CustomButton = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  background: #fff;
  transition: all 0.3s ease-in-out;
  font-size: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  border-radius: 20px;
  position: relative;
  cursor: pointer;

  &:hover {
    ${Overlay} {
      opacity: 1;
    }
    ${CustomButton} {
      background: #ffa200;
      color: #fff;
    }
  }
`;

const JackpotSection = ({ showLogin, token }) => {
  const Numbers = React.memo(({ amount }) => {
    var formatedAmount = Common.formatNumberWithCommas(amount);
    var display = formatedAmount && formatedAmount.split("");

    return display.map((element) => {
      return (
        <TextContent>
          <TextHolder
            hide={element === "," || element === "." || element === " "}
          >
            <Digit>{element}</Digit>
          </TextHolder>
        </TextContent>
      );
    });
  });

  const commonprops = {
    showLogin: showLogin,
    token: token,
  };

  const generateJackpotAmount = ({ min, max }) => {
    let date = new Date();
    let dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    let maxPerDay = (max - min) / 7;
    let minWithDay = Math.floor(min + maxPerDay * dayIndex);
    let maxWithDay = Math.floor(max * ((dayIndex + 1) / 7));
    let amount = Math.floor(
      Math.random() * (maxWithDay - minWithDay + 1) + minWithDay
    );
    return Common.formatNumberWithCommas(amount);
  };
  const initialJackpotAmount = 1822085;
  const [jackpotAmount, setJackpotAmount] = useState(initialJackpotAmount);
  const [homePageGameList, setHomePageGamesList] = useState([]);
  const [homePageGames, setHomePageGames] = useState({
    games: [
      {
        title: "T13.topGames",
        type: "hot",
        category: SlotFilterType.Hot,
      },
      {
        title: "T13.recommeneddGames",
        type: "recommend",
        category: SlotFilterType.Recommend,
      },
      {
        title: "T13.newGames",
        type: "new",
        category: SlotFilterType.New,
      },
    ],
    type: GameTypeEnum.SLOT,
    isInitialized: false,
  });

  const [gameToDisplay, setGameToDisplay] = useState([
    { title: "common.live", type: "live", path: "/live" },
    { title: "common.chess", type: "card", path: "/chess" },
    { title: "common.sports", type: "sport", path: "/sports" },
  ]);

  useEffect(() => {
    getGameList();
  }, []);

  useEffect(() => {
    const updateJackpotAmount = () => {
      if (jackpotAmount < 9999999.99) {
        setJackpotAmount(
          (currentJackpotAmount) =>
            currentJackpotAmount + randomNumber(0.01, 0.2)
        );
      } else {
        setJackpotAmount(initialJackpotAmount);
      }
    };

    const interval = setInterval(updateJackpotAmount, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  const randomNumber = (min, max) => {
    return Math.random() * (min - max) + max;
  };
  const checking = (variant) => {
    return homePageGameList.filter((a) => {
      return a.tag[variant] === true;
    });
  };

  const getGameList = async () => {
    if (!homePageGames.isInitialized) {
      var temp = homePageGames;
      await GameService.GetGameList("", temp.type).then((response) => {
        if (response.IsSuccess) {
          var data = response.data;
          temp.isInitialized = true;
          setHomePageGames(temp);
          setHomePageGamesList(data);
        }
      });
    }
  };

  const navigate = (to) => {
    AppHistory.push(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <JackpotHolder>
        <JackpotContainer />
        <Title>{i18n.t('gameEntrance')}</Title>
        <GameEntranceDisplayer>
          <GameEntranceWrapper>
            {gameToDisplay.map((game) => {
              return (
                <ContentWrapper onClick={()=> navigate(game.path)} key={game.type}>
                  <Overlay />
                  <CustomButton>{i18n.t(game.title)}</CustomButton>
                  <CustomImage
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/pcHomePage/" +
                      game.type +
                      ".png"
                    }
                  />
                </ContentWrapper>
              );
            })}
          </GameEntranceWrapper>
        </GameEntranceDisplayer>
        <Title>{i18n.t('timeToPlay')}</Title>
        <GameGrid commonprops={commonprops} games={homePageGameList.slice(0,18)}/>
      </JackpotHolder>
    </Container>
  );
};

export default JackpotSection;
