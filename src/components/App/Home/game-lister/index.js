import styled from "styled-components";
import config from "../../../../config/config";
import { SortedMenuList } from "../../../../utils/HeaderSorting";
import i18n from "../../../../utils/i18n";
import { AppHistory } from "../../../../history/History";
const GameMenuContainer = styled.div`
  display: flex;

  justify-content: center;
  margin: 0px auto 0px auto;
  background: #252958;
  width: 100%;
`;

const GameMenuIcon = styled.div`
  height: 50px;
  width: 50px;

  margin: 10px auto 0 auto;

  mask: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/pcHeaderMenu/${src}.svg`
    }) no-repeat center /
  contain;`;
  }};
  background: #fff;

  transition: background 0.1s ease-in;
`;

const GameMenuTitle = styled.div`
  font-size: 16px;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ theme }) => theme.gamelisterOriginalText};
`;

const GameMenu = styled.div`
  width: 120px;
  height: 135px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 16px;
  filter: drop-shadow(0 3px 6px #00000028);
  ${({ active }) => {
    return active
      ? `    
  

      ${GameMenuTitle}{
        color:  #ffa200;
      }
    ${GameMenuIcon} {
      background: #ffa200;
    }`
      : ``;
  }}
  &:hover {
    ${GameMenuTitle} {
      color: #ffa200;
    }
    ${GameMenuIcon} {
      background: #ffa200;
    }
  }
`;

const GameLister = ({ game }) => {
  var currentPage = window.location.pathname.split("/")[1];

  const hardcoded = [
    {
      title: "common.promotion",
      gameType: "promotion",
      path: "promotion",
    },
    {
      title: "VIP",
      gameType: "vip",
      path: "vip",
    },
    {
      title: "T13.header.news",
      gameType: "news",
      path: "news",
    },
  ];

  const filterGameList = (item) => {
    if (item.include && item.include !== undefined) {
      game.homePageGameList.map((game) => {
        if (item.include.indexOf(game.game_platform_name) >= 0) {
          game.type = item.gameType[0];
        }
        return item;
      });
    }

    return game.homePageGameList.filter((game) => {
      return item.gameType.indexOf(game.type) >= 0;
    });
  };

  return (
    <GameMenuContainer>
      {SortedMenuList.map((item, index) => {
        var list = filterGameList(item).sort((a, b) => {
          if (config.features.LiveGame_Sorting_SKY) {
            var sortDGFirst = ["DG"];
            return (
              sortDGFirst.indexOf(b.abbreviation) -
              sortDGFirst.indexOf(a.abbreviation)
            );
          } else return b - a;
        });

        if (list.length > 0) {
          return (
            <GameMenu
              active={currentPage === item.path}
              onClick={() => {
                AppHistory.push("/" + item.path);
              }}
            >
              <GameMenuIcon src={item.gameType}></GameMenuIcon>
              <GameMenuTitle>{i18n.t(item.title)}</GameMenuTitle>
            </GameMenu>
          );
        } else {
          return null;
        }
      })}
      {hardcoded.map((item, index) => {
        return (
          <GameMenu
            active={currentPage === item.path}
            onClick={() => {
              AppHistory.push("/" + item.path);
            }}
          >
            <GameMenuIcon src={item.gameType}></GameMenuIcon>
            <GameMenuTitle>{i18n.t(item.title)}</GameMenuTitle>
          </GameMenu>
        );
      })}
    </GameMenuContainer>
  );
};

export default GameLister;
