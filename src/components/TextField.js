/* eslint-disable no-confusing-arrow */
import styled, { css } from 'styled-components';
import React, { PureComponent } from 'react';

class TextFieldComponent extends PureComponent {
  state = {
    text: this.props.defaultValue || '',
    focus: false,
    error: this.props.error || false,
    hasBeenFocused: false,
  }

  onChange = (e) => {
    this.props.onChange && this.props.onChange(e);
    const text = e.target.value;
    const isInvalid = this.props.validator && !this.props.validator(text);
    const isEmptyButRequired = this.props.required ? !e.target.value : false;
    this.setState({
      text,
      error: this.props.error || isInvalid || isEmptyButRequired,
    });
  }

  onFocus = (e) => {
    this.props.onFocus && this.props.onFocus(e);
    this.setState({ focus: true, hasBeenFocused: true });
  }

  onBlur = (e) => {
    this.props.onBlur && this.props.onBlur(e);
    this.setState({ focus: false });
  }

  render() {
    return (
      <Container
        containerStyle={this.props.containerStyle}
        error={this.state.error}
        className={'smc-text-field-container'}
        fullWidth={this.props.fullWidth}
        disabled={this.props.disabled} >
        <FloatingLabel
          className={'smc-text-field-floating-label'}
          error={this.state.error}
          floatingLabelStyle={this.state.error
            ? this.props.floatingLabelErrorStyle
            : this.props.floatingLabelStyle}
          floating={this.state.focus || this.props.hintText || this.state.text.length}>
          {`${this.props.floatingLabelText || ''}${this.props.required ? '*' : ''}`}
          {/* <RequiredStar
            hasBeenFocused={this.state.hasBeenFocused}
            display={this.props.required}
            requiredStarStyle={this.props.requiredStarStyle} /> */}
        </FloatingLabel>
        <HintText
          className={'smc-text-field-hint-text'}
          hintTextStyle={this.props.hintTextStyle}
          error={this.props.error || this.state.error}
          display={!this.props.defaultValue
            && !this.state.text.length && !this.props.value} >
          {this.props.hintText}
        </HintText>
        {this.props.helperText && <HelperText
          className={'smc-text-field-helper-text'}
          helperTextStyle={this.props.helperTextStyle}
          display={!this.state.error
            && (this.props.helperTextPersistent ? true : this.state.focus)}>
          {this.props.helperText}
        </HelperText>}
        <ErrorText
          display={this.state.error}
          className={'smc-text-field-error-text'}
          errorTextStyle={this.props.errorTextStyle} >
          {this.props.errorText}
        </ErrorText>
        <UnderlineFocus
          disabled={this.props.disabled}
          className={'smc-text-field-underline-focus'}
          underlineFocusStyle={this.props.underlineFocusStyle}
          focus={this.state.focus}
          error={this.state.error} />
        <Input
          inputStyle={this.props.inputStyle}
          disabled={this.props.disabled}
          autoFocus={this.props.autoFocus}
          value={this.props.value || this.state.text}
          autoComplete={false}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={'smc-text-field-input'} />
      </Container>
    );
  }
}

const primaryTextColor = css`${props => props.theme.textColors.primary}`;
const hintTextColor = css`${props => props.theme.textColors.hint}`;
const primary = css`${props => props.theme.primary}`;
const error = css`${props => props.theme.textColors.error || '#d50000'}`;

const placeBelow = css`
  position: absolute;
  bottom: -2em;
  font-size: 0.75em;
  width: 100%;
`;

const Container = styled.div`
  width: ${props => props.fullWidth ? '100%' : '167px'};
  font-size: 1em;
  line-height: 1.5em;
  position: relative;
  background-color: transparent;
  font-family: lato, sans-serif;
  border-bottom: 0.5px ${props => props.disabled ? 'dotted' : 'solid'};
  border-bottom-color: ${props => props.error ? error : hintTextColor};
  ${props => props.containerStyle};
`;

/*
This is the code for the red asterisk for required fields
Leaving this in in case there is further deliberation on this subject.
const RequiredStar = styled.span`
  ::after{
    color: ${props => props.hasBeenFocused ? error : hintTextColor};
    content: '*';
    display: ${props => props.display ? 'inline-block' : 'none'}
  }
  ${props => props.requiredStarStyle};
`;
*/

const FloatingLabel = styled.div`
  position: absolute;
  transition: all 200ms;
  bottom: ${props => props.floating ? '1.5em' : '0em'};
  font-size: ${props => props.floating ? '0.75em' : '1em'};
  color: ${(props) => {
    if (props.error) return error;
    return props.floating ? primary : hintTextColor;
  }};
  width: 100%;
  ${props => props.floatingLabelStyle};
`;

const HintText = styled.div`
  position: absolute;
  opacity: ${props => +props.display};
  color: ${props => props.error ? error : hintTextColor};
  transition: all 200ms;
  bottom: 0px;
  width: 100%;
  ${props => props.hintTextStyle};
`;

const ErrorText = styled.div`
  color: ${error};
  opacity: ${props => +props.display};
  transition: all 200ms;
  ${placeBelow};
  ${props => props.errorTextStyle};
`;

const HelperText = styled.div`
  color: ${hintTextColor};
  opacity: ${props => +props.display};
  transition: all 200ms;
  ${placeBelow};
  ${props => props.helperTextStyle};
`;

const UnderlineFocus = styled.div`
  position: absolute;
  bottom: 0px;
  border-top: 1.5px solid;
  border-top-color: ${props => props.error ? error : primary};
  width: 0%;
  transition: width 200ms;
  ${props => props.focus && 'width: 100%'};
  ${props => props.underlineFocusStyle};
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  border: none;
  outline: none;
  color: ${primaryTextColor};
  cursor: inherit;
  background-color: inherit;
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  ${props => props.inputStyle};
`;

export default TextFieldComponent;
