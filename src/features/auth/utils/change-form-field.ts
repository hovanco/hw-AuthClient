import {FormInstance} from 'antd/lib/form';
import {debounce} from 'lodash';

const TIME = 1500;

const changeFormField = debounce(
    (form: FormInstance, name: string, value: string) =>
        form.setFieldsValue({[name]: value.trim()}),
    TIME,
);

export {changeFormField};
