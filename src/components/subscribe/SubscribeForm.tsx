import { lighten, saturate } from 'polished';
import React from 'react';
import styled from '@emotion/styled';

import { css } from '@emotion/core';

import { colors } from '../../styles/colors';
import config from '../../website-config';

export const SubscribeForm: React.FC = () => {
  return (
    <form
      noValidate
      css={SubscribeFormStyles}
      action={config.mailchimpAction} 
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="subscribe-form"
      target="_blank"
    >
      {/* This is required for the form to work correctly  */}
      <FormGroup className="form-group">
        <SubscribeEmail
          className="subscribe-email"
          type="email"
          name={config.mailchimpEmailFieldName}
          id={config.mailchimpEmailFieldName}
          placeholder="youremail@example.com"
        />
      </FormGroup>
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input type="text" name={config.mailchimpName} tabIndex={-1} />
      </div>
      <SubscribeFormButton type="submit">
        <span>Subscribe</span>
      </SubscribeFormButton>
    </form>
  );
};

const SubscribeFormStyles = css`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 460px;

  @media (max-width: 500px) {
    flex-direction: column;

    .form-group {
      flex-direction: column;
      width: 100%;
    }
  }
`;

const SubscribeEmail = styled.input`
  display: block;
  padding: 6px 7px 6px 16px;
  width: 100%;
  /* border: color(var(--lightgrey) l(+7%)) 1px solid; */
  border: ${lighten('0.07', colors.lightgrey)} 0px solid;
  /* color: var(--midgrey); */
  color: ${colors.midgrey};
  font-size: 1.8rem;
  line-height: 1em;
  font-weight: normal;
  user-select: text;
  border-radius: 3px;
  transition: border-color 0.15s linear;
  height: 54px;
  transition: color 180ms;
  

  -webkit-appearance: none;
  ::placeholder{
	  color: #a2b8cd;
  }
  :focus {
    outline: 0;
    /* border-color: color(var(--lightgrey) l(-2%)); */
    border-color: ${lighten('-0.02', colors.lightgrey)};
	background: #fff;
	color: #000;
	
	::placeholder{
		color: #808080;
	}
  }

  @media (prefers-color-scheme: dark) {
    /* border-color: color(var(--darkmode) l(+6%)); */
    border-color: ${lighten('0.06', colors.darkmode)};
    color: rgba(255, 255, 255, 0.9);
    /* background: color(var(--darkmode) l(+3%)); */
    background: #2c4d6d;
    :focus {
      /* border-color: color(var(--darkmode) l(+25%)); */
      border-color: ${lighten('0.25', colors.darkmode)};
    }
  }
`;

const SubscribeFormButton = styled.button`
  position: relative;
  display: inline-block;
  margin: 0 0 0 -12.4rem;
  padding: 0 20px;
  height: 41px;
  outline: none;
  color: #fff;
  font-size: 1.5rem;
  line-height: 39px;
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  /* background: linear-gradient(
    color(var(--blue) whiteness(+7%)),
    color(var(--blue) lightness(-7%) saturation(-10%)) 60%,
    color(var(--blue) lightness(-7%) saturation(-10%)) 90%,
    color(var(--blue) lightness(-4%) saturation(-10%))
  ); */
  /* background: linear-gradient(
    ${lighten('0.07', colors.blue)},
    ${saturate('-0.1', lighten('-0.07', colors.blue))} 60%,
    ${saturate('-0.1', lighten('-0.07', colors.blue))} 90%,
    ${saturate('-0.1', lighten('-0.04', colors.blue))}
  ); */
  background-image: linear-gradient(to right,#e052a0,#f15c41);

  /*background: linear-gradient(#4fb7f0, #29a0e0 60%, #29a0e0 90%, #36a6e2);*/

  border-radius: 3px;

  -webkit-font-smoothing: subpixel-antialiased;

  :active,
  :focus, :hover {
    /* background: color(var(--blue) lightness(-9%) saturation(-10%)); */
   /* background: ${saturate('-0.1', lighten('-0.09', colors.blue))};*/
   background-image: linear-gradient(to right,#3ec7e0,#526bf4);
  }
  @media (max-width: 500px) {
    margin: 10px 0 0 0;
    width: 100%;
  }

  @media (prefers-color-scheme: dark) {
    opacity: 0.9;
  }
`;

const FormGroup = styled.div`
  @media (max-width: 500px) {
    width: 100%;
  }
`;

