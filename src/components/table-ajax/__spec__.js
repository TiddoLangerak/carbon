import React from 'react';
import Immutable from 'immutable';
import { TableAjax } from './table-ajax';
import { shallow, mount } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Pager from './../pager';

import Request from 'superagent';

/* global jest console */

jest.mock('superagent');

describe('TableAjax', () => {
  let wrapper, customInstanceWrapper, pageSizeInstanceWrapper, instance, customInstance, pageSizeInstance, spy;

  beforeEach(() => {
    spy = jasmine.createSpy('onChange spy');

    wrapper = mount(
      <TableAjax
        className="foo"
        path='/test'
        onChange={ spy }
      >
       foo
      </TableAjax>
    );
    instance = wrapper.instance();

    customInstanceWrapper = mount(
      <TableAjax
        className="foo"
        path='/test'
        onChange={ spy }
        sortOrder='desc'
        sortedColumn='name'
      >
       foo
      </TableAjax>
    );
    customInstance = customInstanceWrapper.instance();

    pageSizeInstanceWrapper = mount(
      <TableAjax
        className="foo"
        path='/test'
        onChange={ spy }
        pageSize={ '10' }
      >
       foo
      </TableAjax>
    );
    pageSizeInstance = pageSizeInstanceWrapper.instance();
  });

  describe('componentWillUnmount', () => {
    it('calls stopTimeout', () => {
      spyOn(instance, 'stopTimeout');
      instance.componentWillUnmount();
      expect(instance.stopTimeout).toHaveBeenCalled();
    });
  });

  describe('componentDidMount', () => {
    it('calls emitOnChange to get initial table data', () => {
      spyOn(instance, 'emitOnChangeCallback');
      instance.componentDidMount();
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('data', {
        currentPage: '1',
        pageSize: '10',
        sortOrder: '',
        sortedColumn: '',
        filter: {}
      }, 0);
    });

    describe('when custom props are passed', () => {
      it('sends the custom props', () => {
        spyOn(customInstance, 'emitOnChangeCallback');
        customInstance.componentDidMount();
        expect(customInstance.emitOnChangeCallback).toHaveBeenCalledWith('data', {
          currentPage: '1',
          pageSize: '10',
          sortOrder: 'desc',
          sortedColumn: 'name',
          filter: {}
        }, 0);
      });
    });

    describe('when custom props are passed', () => {
      it('sends the custom props', () => {
        spyOn(customInstance, 'emitOnChangeCallback');
        customInstance.componentDidMount();
        expect(customInstance.emitOnChangeCallback).toHaveBeenCalledWith('data', {
          currentPage: '1',
          pageSize: '10',
          sortOrder: 'desc',
          sortedColumn: 'name',
          filter: {}
        }, 0);
      });
    });
  });

  describe('componentDidUpdate', () => {
    it('does not call emitOnChangeCallback with the same pageSize', () => {
      spyOn(pageSizeInstance, 'emitOnChangeCallback');
      pageSizeInstance.componentDidUpdate({},{ pageSize: '10' });
      expect(pageSizeInstance.emitOnChangeCallback).not.toHaveBeenCalled();
    });

    it('calls emitOnChangeCallback when pageSize changes', () => {
      spyOn(pageSizeInstance, 'emitOnChangeCallback');
      pageSizeInstance.componentDidUpdate({},{ pageSize: '20' });
      expect(pageSizeInstance.emitOnChangeCallback).toHaveBeenCalled();
    });

    it('calls to resize the table', () => {
      spyOn(instance, 'resizeTable');
      instance.componentDidUpdate({},{});
      expect(instance.resizeTable).toHaveBeenCalled();
    });
  });

  describe('componentWillReceiveProps', () => {
    it('does not call setState with the same pageSize', () => {
      spyOn(pageSizeInstance, 'setState');
      pageSizeInstance.componentWillReceiveProps({pageSize: '10'});
      expect(pageSizeInstance.setState).not.toHaveBeenCalled();
    });

    it('calls emitOnChangeCallback when pageSize changes', () => {
      spyOn(pageSizeInstance, 'setState');
      pageSizeInstance.componentWillReceiveProps({pageSize: '20'});
      expect(pageSizeInstance.setState).toHaveBeenCalledWith({ pageSize: '20' });
    });
  });


  describe('pageSize', () => {
    it('gets the current pageSize', () => {
      instance.setState({ pageSize: '10' });
      expect(instance.pageSize).toEqual('10');
    });
  });

  describe('emitOnChangeCallback', () => {
    let options, request;

    beforeEach(() => {
      jest.useFakeTimers();

      options = {
        currentPage: '1',
        pageSize: '10',
        sortOrder: undefined,
        sortedColumn: undefined
      };
    });

    it('resets the select all component', () => {
      let selectAllComponent = {
        setState: jasmine.createSpy()
      };
      instance.selectAllComponent = selectAllComponent;
      instance.emitOnChangeCallback('data', options);
      expect(selectAllComponent.setState).toHaveBeenCalledWith({ selected: false });
      expect(instance.selectAllComponent).toBe(null);
    });

    it('Sets the new pageSize and currentPage in state', () => {
      spyOn(instance, 'setState');
      instance.emitOnChangeCallback('data', options);
      expect(instance.setState).toHaveBeenCalledWith(options);
    });

    it('sets current page to 1 if filter has been updated', () => {
      spyOn(instance, 'setState');
      options.currentPage = "2";
      instance.emitOnChangeCallback('filter', options);
      options.currentPage = "1";
      expect(instance.setState).toHaveBeenCalledWith(options);
    });

    it('queries for the data after the set timeout', () => {
      Request.query = jest.fn().mockReturnThis();
      instance.emitOnChangeCallback('data', options, 50);

      expect(Request.query.mock.calls.length).toBe(0);

      jest.runTimersToTime(51);
      expect(Request.query).toBeCalledWith('page=1&rows=10');
    });

    it('queries for the data after 250ms', () => {
      Request.query = jest.fn().mockReturnThis();
      instance.emitOnChangeCallback('data', options);

      expect(Request.query.mock.calls.length).toBe(0);

      jest.runTimersToTime(251);
      expect(Request.query).toBeCalledWith('page=1&rows=10');
    });

    it('stores the request', () => {
      expect(instance._request).toBe(null);
      instance.emitOnChangeCallback('data', options);
      jest.runTimersToTime(251);
      expect(instance._request).toBeDefined();
    });

    it('on success emits the returned data', () => {
      Request.__setMockResponse({
        status() {
          return 200;
        },
        ok() {
          return true;
        },
        body: {
          data: ['foo']
        }
      });

      instance.emitOnChangeCallback('data', options);
      jest.runTimersToTime(251);

      expect(spy).toHaveBeenCalledWith({ data: ['foo'] });
    });

    it('on success sets the totalRecords on the pager and sets data-state to loaded', () => {
      Request.__setMockResponse({
        status() {
          return 200;
        },
        ok() {
          return true;
        },
        body: {
          records: 1
        }
      });
      instance.emitOnChangeCallback('data', options);
      jest.runTimersToTime(251);
      const pager = wrapper.find(Pager);
      expect(pager.props().totalRecords).toEqual('1');
      expect(wrapper.find('.carbon-table').length).toEqual(1);
      expect(wrapper.find('[data-state="loaded"]').length).toEqual(1);
    });

    describe('when page size is less than previous page size', () => {
      it('calls resetTableHeight on successful response', () => {
        instance.resetTableHeight = jest.fn();
        options = { currentPage: '1', pageSize: '5' }
        Request.__setMockResponse({
          status() {
            return 200;
          },
          ok() {
            return true;
          },
          body: {
            data: 'foo'
          }
        });

        instance.emitOnChangeCallback('data', options);
        jest.runTimersToTime(251);

        expect(instance.resetTableHeight).toBeCalled();
      });
    });
  });

  describe('stopTimeout', () => {
    describe('when timeout is present', () => {
      it('clears the timeout', () => {
        spyOn(window, 'clearTimeout');
        instance.timeout = 'foo'
        instance.stopTimeout();
        expect(window.clearTimeout).toHaveBeenCalledWith('foo');
      });
    });

    describe('when request is present', () => {
      it('aborts the request', () => {
        let spy = jasmine.createSpy(),
            req = { abort: spy };

        instance._request = req;
        instance.stopTimeout();
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('query params', () => {
    it('returns formatted params for server request', () => {
      let options = { currentPage: 10, pageSize: 20 };
      let expected = "page=10&rows=20";
      expect(instance.queryParams('', options)).toEqual(expected);
    });

    it('returns formatted params for server request with filter', () => {
      let options = { currentPage: 10, pageSize: 20, sortOrder: 'asc', sortedColumn: 'name', filter: { foo: "bar" } };
      let expected = "foo=bar&page=10&rows=20&sord=asc&sidx=name";
      expect(instance.queryParams('', options)).toEqual(expected);
    });

    it('returns currentPage as 1 if element is filter', () => {
      let options = { currentPage: 10, pageSize: 20, sortOrder: 'asc', sortedColumn: 'name', filter: { foo: "bar" } };
      let expected = "foo=bar&page=1&rows=20&sord=asc&sidx=name";
      expect(instance.queryParams('filter', options)).toEqual(expected);
    });
  });

  describe('emitOptions', () => {
    it('gathers all relevent state variables for endpoint', () => {
      expect(instance.emitOptions()).toEqual({
        currentPage: '1',
        filter: {},
        pageSize: '10',
        sortedColumn: '',
        sortOrder: ''
      });
    });

    it('gathers all relevent state variables for endpoint with passed props', () => {
      let props = {
        filter: Immutable.fromJS({
          foo: "bar"
        })
      };
      expect(instance.emitOptions(props)).toEqual({
        currentPage: '1',
        filter: { foo: "bar" },
        pageSize: '10',
        sortedColumn: '',
        sortOrder: ''
      });
    });
  });

  describe('onAjaxError', () => {
    const error = {
      message: 'Unsuccessful HTTP response'
    };
    const response = {
      status() {
        return 500;
      },
      ok() {
        return false;
      },
      body: {
        message_type: 'error'
      }
    };

    beforeEach(() => {
      Request.__setMockResponse(response);
      Request.__setMockError(error);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    })

    describe('when passed as a prop', () => {
      it('is called if defined and an Ajax request returns an error', () => {
        const onError = jest.fn();
        const wrapper = mount(
          <TableAjax
            onAjaxError={ onError }
          />
        );
        jest.runTimersToTime(251);
        expect(onError).toBeCalledWith(error, response);
        expect(wrapper.find('[data-state="errored"]').length).toEqual(1);
      });
    });

    describe('when not passed as a prop', () => {
      it('logs the Ajax error as a warning in the console', () => {
        console.warn = jest.fn();

        const wrapper = mount(
          <TableAjax />
        );
        jest.runTimersToTime(251);

        expect(console.warn).toBeCalled();
        expect(wrapper.find('[data-state="errored"]').length).toEqual(1);
      });
    });
  });

  describe('pagerProps', () => {
    it('gathers all variables that apply to the pager', () => {
      let props = instance.pagerProps;
      expect(props.currentPage).toEqual('1')
      expect(props.pageSize).toEqual('10')
      expect(props.totalRecords).toEqual('0')
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(
      <TableAjax
        data-element='bar'
        data-role='baz'
        path='test'
      />
    );

    it('includes the correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'table-ajax', 'bar', 'baz');
    });

    it('initializes the data-state attribute as "idle"', () => {
      expect(wrapper.find('[data-state="idle"]').length).toEqual(1);
    })
  });
});
