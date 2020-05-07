import { Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import { lighten } from 'polished';
import React, { useState } from 'react';

import { css } from '@emotion/core';

import { colors } from '../styles/colors';
import { Author } from '../templates/post';
import { AuthorProfileImage } from './PostCard';
import styled from '@emotion/styled';

interface AuthorListItemProps {
  tooltip: 'small' | 'large';
  author: Author;
}

export const AuthorListItem: React.FC<AuthorListItemProps> = props => {
  const [hovered, setHover] = useState(false);
  let timeout: NodeJS.Timeout;
  function handleMouseEnter() {
    if (props.tooltip !== 'large') {
      return;
    }

    clearTimeout(timeout);
    setHover(true);
  }

  function handleMouseLeave() {
    clearTimeout(timeout);
    timeout = setTimeout(() => setHover(false), 600);
  }

  return (
    <AuthorListItemLi
      className="author-list-item"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      {props.tooltip === 'small' && (
        <AuthorNameTooltip className="author-name-tooltip">{props.author.id}</AuthorNameTooltip>
      )}
      {props.tooltip === 'large' && (
        <div css={[AuthorCardStyles, hovered && Hovered]} className="author-card">
          {props.author.avatar.children.length && (
            <Img
              css={AuthorProfileImage}
              className="author-profile-image"
              fluid={props.author.avatar.children[0].fluid}
              fadeIn={false}
            />
          )}
          <section class="post-full-byline-meta"><h4 class="author-name">{props.author.id}</h4></section>
          <div className="author-info">
            <div className="bio">
              <h2>{props.author.id}</h2>
              <p>{props.author.bio}</p>
             
            </div>
          </div>
         <div class="author-forward">
          <p>
                <Link to={`/author/${_.kebabCase(props.author.id)}/`}>More posts</Link> by{' '}
                {props.author.id}.
              </p>
              </div>
        </div>
      )}
      <Link
        css={AuthorAvatar}
        className="author-avatar"
        to={`/author/${_.kebabCase(props.author.id)}/`}
      >
        <Img
          css={AuthorProfileImage}
          className="author-profile-image"
          fluid={props.author.avatar.children[0].fluid}
          alt={props.author.id}
          fadeIn={false}
        />
      </Link>
    </AuthorListItemLi>
  );
};

const Hovered = css`
  opacity: 1;
  transform: scale(1) translateY(0px);
  pointer-events: auto;
`;

const AuthorListItemLi = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  :hover .author-name-tooltip {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const AuthorNameTooltip = styled.div`
  position: absolute;
  bottom: 105%;
  z-index: 999;
  display: block;
  padding: 2px 8px;
  color: white;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
  white-space: nowrap;
  /* background: var(--darkgrey); */
  background: ${colors.darkgrey};
  border-radius: 3px;
  box-shadow: rgba(39, 44, 49, 0.08) 0 12px 26px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  opacity: 0;
  transition: all 0.35s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transform: translateY(6px);
  pointer-events: none;
 
 

  @media (max-width: 700px) {
    display: none;
  }
`;

const AuthorCardStyles = css`
  position: absolute;
  bottom: 130%;
  left: 50%;
  z-index: 600;
  display: flex;
  justify-content: space-between;
  margin-left: -110px;
  width: 220px;
  font-size: 1.4rem;
  line-height: 1.5em;
  background: white;
  border-radius: 3px;
  box-shadow: 0 0 60px 16px rgba(12,31,49,.5);
  opacity: 0;
  transition: all 0.35s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transform: scale(0.98) translateY(15px);
  pointer-events: none;
  padding: 0px;

  flex-direction: column;
  

  :before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    display: block;
    margin-left: -8px;
    width: 0;
    height: 0;
    border-top: 8px solid #fff;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  }

  .author-info {
    flex: 1 1 auto;
    padding:10px;
  }

  .author-info h2 {
    margin: 8px 0 0;
    font-size: 1.6rem;
  }

  .author-info p {
    margin: 4px 0 0;
    color: color(var(--midgrey) l(-10%));
  }

  .author-info .bio h2 {
    margin-top: 0;
  }

  .author-info .bio p {
    margin-top: 0.8em;
  }

  .author-profile-image {
    flex: 0 0 60px;
    margin: 0;
    width: 60px;
    height: 60px;
    border: none;
  }

  @media (max-width: 1170px) {
    margin-left: -50px;
    width: 430px;

    :before {
      left: 50px;
    }
  }

  @media (max-width: 650px) {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    /* background: color(var(--darkmode) l(+4%)); */
    background: #274059;
    box-shadow: 0 0 60px 16px rgba(12,31,49,.5);

    :before {
      /* border-top-color: color(var(--darkmode) l(+4%)); */
     /* border-top-color: ${lighten('0.04', colors.darkmode)};*/
     border-top-color: #274059;
    }
  }
`;

const AuthorAvatar = css`
  display: block;
  overflow: hidden;
  margin: 0 -4px;
  width: 40px;
  height: 40px;
  border: #fff 2px solid;
  border-radius: 100%;
  transition: all 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99) 700ms;

  @media (max-width: 500px) {
    width: 36px;
    height: 36px;
  }

  @media (prefers-color-scheme: dark) {
    /* border-color: color(var(--darkgrey) l(+2%)); */
    border-color: ${lighten('0.02', colors.darkgrey)};
  }
`;