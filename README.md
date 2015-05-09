Angular module to show different type of loading spinners. Currenlty it provides three different type of spinners 

a. SpinnerTextService - This serivce shows a spinner along with a text message. The service also provides methods to stop the spinner as well as update the text message to indicate progress.

b. GenericSpinner - This directives takes a spinner template and a boolean variable `loading`. When `loading` is true spinner is shown, otherwise the transcluded content is shown

c. SpinJs - This directive is exactly like GenericSpinner, only difference being it uses spin.js spinner. Apart from `loading` this directive also allows you to pass options as attributes to update the spin.js configurations. 