import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean, number, text, select
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Textarea from '.';
import { notes, info } from './documentation';
import { OriginalTextarea } from './textarea.component';
import Form from '../../../components/form';

const store = new Store({
  value: ''
});

const handleChange = ({ target: { value } }) => {
  store.set({ value });
};

const rangeOptions = {
  range: true,
  min: 0,
  max: 300,
  step: 1
};
const percentageRange = {
  range: true,
  min: 0,
  max: 100,
  step: 1
};

storiesOf('Experimental/Textarea', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  }).add(
    'default',
    () => {
      const expandable = boolean('expandable', Textarea.defaultProps.expandable);
      const cols = number('cols', 0, rangeOptions);
      const rows = number('rows', 0, rangeOptions);
      const disabled = boolean('disabled', false);
      const readOnly = boolean('readOnly', false);
      const placeholder = text('placeholder', '');
      const fieldHelp = text('fieldHelp', '');
      const characterLimit = text('characterLimit', '');
      const inputWidth = number('inputWidth', 100, percentageRange);
      const warnOverLimit = characterLimit ? boolean('warnOverLimit', Textarea.defaultProps.warnOverLimit) : undefined;
      const enforceCharacterLimit = characterLimit ? boolean(
        'enforceCharacterLimit',
        Textarea.defaultProps.enforceCharacterLimit
      ) : undefined;
      const label = text('label', '');
      const labelHelp = label ? text('labelHelp', '') : undefined;
      const labelInline = label ? boolean('labelInline', false) : undefined;
      const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
      const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;

      return (
        <State store={ store }>
          <Textarea
            name='textarea'
            onChange={ handleChange }
            warnOverLimit={ warnOverLimit }
            expandable={ expandable }
            characterLimit={ characterLimit }
            enforceCharacterLimit={ enforceCharacterLimit }
            cols={ cols }
            rows={ rows }
            disabled={ disabled }
            readOnly={ readOnly }
            placeholder={ placeholder }
            fieldHelp={ fieldHelp }
            label={ label }
            labelHelp={ labelHelp }
            labelInline={ labelInline }
            labelWidth={ labelWidth }
            inputWidth={ inputWidth }
            labelAlign={ labelAlign }
          />
        </State>
      );
    },
    {
      info: { text: info, propTables: [OriginalTextarea], propTablesExclude: [Textarea] },
      notes: { markdown: notes }
    },
  )
  .add('validations', () => {
    return (
      <Form
        onSubmit={ handleSubmit }
      >
        <State store={ store }>
          <Textarea
            name='textarea'
            label='Textarea Validation'
            labelHelp='Returns error when the field is empty'
            fieldHelp='Validates on blur'
            onChange={ ev => store.set({ value: ev.target.value }) }
            warnings={ warningValidator }
            validations={ errorValidator }
            info={ lengthValidator }
          />
        </State>
      </Form>
    );
  });

function errorValidator(value) {
  return new Promise((resolve, reject) => {
    if (value.includes('error')) {
      resolve();
    } else {
      reject(new Error('This value must not include the word "error"!'));
    }
  });
}

function warningValidator(value) {
  return new Promise((resolve, reject) => {
    if (value.includes('warning')) {
      resolve();
    } else {
      reject(new Error('This value must include the word "warning"!'));
    }
  });
}

function lengthValidator(value) {
  return new Promise((resolve, reject) => {
    if (value.length > 12) return resolve(true);
    return reject(Error('Message should be longer than 12 characters'));
  });
}

function handleSubmit(ev) {
  ev.preventDefault();
  action('submit')();
}
