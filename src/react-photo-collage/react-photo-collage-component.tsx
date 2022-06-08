import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";

interface StyledComponentProps {
  [key: string]: any;
}
export const SC: StyledComponentProps = {};

SC.PhotoCollage = styled.div`
  width: ${(props) => props.collageWidth};
  font-family: Helvetica, Arial, sans-serif;
`;

SC.PhotoCollageCol = styled.div`
  width: ${(props) => props.collageWidth};
  font-family: Helvetica, Arial, sans-serif;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

SC.PhotoRow = styled.div`
  display: flex;
  height: ${(props) => props.rowHeight};
  box-sizing: border-box;
  & + & {
    margin-top: 2px;
  }
`;

SC.PhotoRowCol = styled.div`
  height: ${(props) => props.layoutIndex === 0 ? props.rowHeight : props.firstIndexHeight};
  display: ${(props) => props.layoutIndex === 0 ? 'flex' : 'grid'};
  gap: 10px;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  grid-auto-flow: column;
  box-sizing: border-box;
  & + & {
    margin-top: 2px;
  }
`;

SC.PhotoGrid = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  cursor: pointer;
  & + & {
    margin-left: 2px;
  }
`;
SC.PhotoThumb = styled.div`
  flex: 1;
  background-image: url(${(props) => props.thumb});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${(props) => props.imageRadius || "0px"};
`;
SC.PhotoMask = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  cursor: pointer;
`;
SC.NumOfRemaining = styled.div`
  position: absolute;
  color: #fff;
  font-size: 35px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &:before {
    content: "+";
  }
`;
SC.ViewMore = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  cursor: pointer;
`;

interface RowPhotosProps {
  height: string;
  photos: any;
  openLightbox: any;
  layoutNum: number;
  remainingNum: number;
  showNumOfRemainingPhotos: boolean;
  imageRadius: string;
  layoutType: string;
  layoutIndex?: number,
  firstIndexHeight?: string
}
const RowPhotos: React.FC<RowPhotosProps> = (props) => {
  const {
    height,
    photos,
    layoutNum,
    remainingNum,
    showNumOfRemainingPhotos,
    openLightbox,
    imageRadius,
    layoutType,
    layoutIndex,
    firstIndexHeight,
  } = props;

  if (layoutType === "col") {
    return (
      <SC.PhotoRowCol rowHeight={height} layoutIndex={layoutIndex} firstIndexHeight={firstIndexHeight}>
        {photos.map((data, i) => {
          return (
            <SC.PhotoGrid
              key={i}
              data-id={data.id}
              onClick={(e) => openLightbox(e.currentTarget.dataset.id)}
            >
              {showNumOfRemainingPhotos &&
              remainingNum > 0 &&
              data.id === layoutNum - 1 ? (
                <React.Fragment>
                  <SC.PhotoMask></SC.PhotoMask>
                  <SC.ViewMore>
                    <SC.NumOfRemaining>{remainingNum}</SC.NumOfRemaining>
                  </SC.ViewMore>
                </React.Fragment>
              ) : null}
              <SC.PhotoThumb
                thumb={data.source}
                imageRadius={imageRadius}
              ></SC.PhotoThumb>
            </SC.PhotoGrid>
          );
        })}
      </SC.PhotoRowCol>
    );
  }

  return (
    <SC.PhotoRow rowHeight={height}>
      {photos.map((data, i) => {
        return (
          <SC.PhotoGrid
            key={i}
            data-id={data.id}
            onClick={(e) => openLightbox(e.currentTarget.dataset.id)}
          >
            {showNumOfRemainingPhotos &&
            remainingNum > 0 &&
            data.id === layoutNum - 1 ? (
              <React.Fragment>
                <SC.PhotoMask></SC.PhotoMask>
                <SC.ViewMore>
                  <SC.NumOfRemaining>{remainingNum}</SC.NumOfRemaining>
                </SC.ViewMore>
              </React.Fragment>
            ) : null}
            <SC.PhotoThumb
              thumb={data.source}
              imageRadius={imageRadius}
            ></SC.PhotoThumb>
          </SC.PhotoGrid>
        );
      })}
    </SC.PhotoRow>
  );
};

interface ReactPhotoCollageComponentProps {
  width: string;
  height: Array<string>;
  layout: Array<number>;
  layoutPhotoMaps: any;
  layoutNum: number;
  remainingNum: number;
  showNumOfRemainingPhotos: boolean;
  openLightbox: any;
  imageRadius: string;
  layoutType: string;
}
export const ReactPhotoCollageComponent: React.FC<
  ReactPhotoCollageComponentProps
> = React.memo((props) => {
  const {
    width,
    height,
    layout,
    layoutPhotoMaps,
    layoutNum,
    remainingNum,
    showNumOfRemainingPhotos,
    openLightbox,
    imageRadius,
    layoutType,
  } = props;

  if (layoutType === "col") {
    return (
      <SC.PhotoCollageCol collageWidth={width}>
        {layout.map((data, i) => {
          return (
            <RowPhotos
              key={i}
              layoutIndex={i}
              firstIndexHeight={height[0]}
              height={height[i]}
              photos={layoutPhotoMaps[i]}
              openLightbox={openLightbox}
              layoutNum={layoutNum}
              remainingNum={remainingNum}
              showNumOfRemainingPhotos={showNumOfRemainingPhotos}
              imageRadius={imageRadius}
              layoutType={layoutType}
            />
          );
        })}
      </SC.PhotoCollageCol>
    );
  }

  return (
    <SC.PhotoCollage collageWidth={width}>
      {layout.map((data, i) => {
        return (
          <RowPhotos
            key={i}
            height={height[i]}
            photos={layoutPhotoMaps[i]}
            openLightbox={openLightbox}
            layoutNum={layoutNum}
            remainingNum={remainingNum}
            showNumOfRemainingPhotos={showNumOfRemainingPhotos}
            imageRadius={imageRadius}
            layoutType={layoutType}
          />
        );
      })}
    </SC.PhotoCollage>
  );
});
