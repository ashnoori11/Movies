import * as Yup from 'yup';

function configureValidation() {
    Yup.addMethod(Yup.string, 'firstLetterUppercase', function () {
        return this.test('first-letter-uppercase', 'first letter must be uppercase', function (value) {
            if (value && value.length > 0) {
                const firstLetter = value[0];
                return firstLetter === firstLetter.toUpperCase();
            }

            return true;
        })
    })
}

export default configureValidation;