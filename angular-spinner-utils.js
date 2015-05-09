angular.module('AngularSpinnerUtils', ['angular-bootstrap'])
    .factory('spinnerTextService',
        ['$modal',  '$rootScope', function($modal, $rootScope){
        var controller = ['$scope', '$modalInstance', 'message',
            function($scope, $modalInstance, message){
                $scope.message = message;

                $scope.close = function(){
                    $modalInstance.dismiss();
                }

                $scope.$on('progress', function(event, message){
                    $scope.message = message;
                });
            }
        ];

        return function(){
            this.open = function(message){
                this.modalInstance = $modal.open({
                    template: '<div class="modal-body">\
                                <button type="button" class="close" \
                                        data-dismiss="modal" ng-click="close()">×</button>\
                                <div class="pull-left spinner-progress"></div>\
                                <div class="spinner-message">{{ message }}</div>\
                              </div>',

                    controller: controller,
                    resolve: {
                        message: function(){
                            return message;
                        }
                    }
                });
                return this;
            };

            this.setProgress = function(message){
                $rootScope.$broadcast('progress', message);
                return this;
            };

            this. close = function(){
                this.modalInstance.close();
            };

        };
}])
.directive('genericSpinner', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            loading: '=',
            template: '='
        },
        template: '<div>\
                <div class="spinner-wrapper" \
                     style="position: relative; height: 100%;" \
                     ng-if="loading"> \
                    <ng-include src="template">\
                </div>\
                <div ng-if="!loading"  ng-transclude></div>\
           </div>'
    }
})
.directive('angularSpinJS',
    function(){
        var opts = {
            lines: 8, // The number of lines to draw
            length: 6, // The length of each line
            width: 6, // The line thickness
            radius: 12, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb or array of colors
            speed: 1.2, // Rounds per second
            trail: 64, // Afterglow percentage
            shadow: true, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };

        var presets = {
            default: opts,
            xlarge: _.extend(_.clone(opts),
                {lines: 12, length: 12, width: 8, radius: 36 }),
            large: _.extend(_.clone(opts),
                {lines: 12, length: 8, width: 8, radius: 24 }),
            small: _.extend(_.clone(opts), { lines: 8, length: 4, width: 4, radius: 12 }),
            tiny: _.extend(_.clone(opts), {lines: 6, length: 4, width: 4, radius: 8 })
        };

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                loading: '='
            },

            template: '<div>\
                        <div class="spinner-wrapper"\
                              style="position: absolute;display: \
                              block;top: 50%;left: 50%;">\
                        </div>\
                        <div ng-hide="loading"  ng-transclude></div>\
                      </div>',

            link: function(scope, element, attrs) {
                var opts = presets[attrs.preset] || presets.default;
                opts = _.extend(opts, attrs);
                var spinner = new Spinner(opts);
                scope.$watch("loading", function(value){
                    if(!value)
                        spinner.stop();
                    else
                        spinner.spin(element.children()[0]);
                });
            }
        };

    })
