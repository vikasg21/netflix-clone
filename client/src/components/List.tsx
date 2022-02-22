import React from "react";

import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "./ListItem";
import { ListInterface } from "pages/Home";

function List({ list, type }: { list: ListInterface; type?: string }) {
  const listRef = React.useRef<HTMLDivElement>(null);

  const [slideNumber, setSlideNumber] = React.useState<number>(0);
  const [isMoved, setIsMoved] = React.useState<boolean>(false);
  const handleClick = (direction: string) => {
    if (listRef && listRef.current) {
      let distance: number = listRef.current?.getBoundingClientRect().x - 48;
      console.log({ distance });
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${244 + distance}px)`;
      }
      if (direction === "right") {
        setSlideNumber(slideNumber + 1);
        setIsMoved(true);
        listRef.current.style.transform = `translateX(${-244 + distance}px)`;
      }
    }
  };

  return (
    <div className="list my-[3vw] px-[4%]">
      <span className="listTitle  text-xs font-medium leading-snug text-white md:text-[1.4vw]">
        {list.title}
      </span>
      <div className="wrapper relative">
        {isMoved && (
          <ArrowBackIosOutlined
            onClick={() => handleClick("left")}
            style={{ width: "4%", height: "100%" }}
            className="absolute  left-0 z-10 cursor-pointer bg-[rgb(22,22,22,0.2)] text-white"
          />
        )}
        <div
          ref={listRef}
          className="containerss xsm:auto-cols-[33.333%] grid w-full auto-cols-[50%] grid-flow-col transition-all duration-1000 ease-in-out md:auto-cols-[25%]  lg:auto-cols-[25%] xl:auto-cols-[20%] 2xl:auto-cols-[16.666%]"
        >
          {list.content.map((item, index) => (
            <ListItem index={index} _item={item} key={item?.id} type={type} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          onClick={() => handleClick("right")}
          style={{ width: "4%", height: "100%" }}
          className="absolute right-0 top-0 bottom-0 z-10 cursor-pointer bg-[rgb(22,22,22,0.2)] text-white"
        />
      </div>
    </div>
  );
}

export default List;
