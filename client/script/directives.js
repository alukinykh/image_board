angular.module('myApp')

    // Angular File Upload module does not include this directive
    // Only for example


    /**
     * The ng-thumb directive
     * @author: nerv
     * @version: 0.1.2, 2014-01-09
     */
    .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        // console.info(elem.val() === $(firstPassword).val());
                        ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                    });
                });
            }

        }
    }])
    .directive('comments', [function ($compile) {
        return {
            restrict: 'E',
            scope: {
                post: '@'
            },
            // template: '<p ng-click="add()">{{text}}</p>',
            link: function (scope, element, attrs) {
                element.bind("click", function(){
                console.log(scope);
                scope.count++;
                angular.element(document.getElementById('space-for-buttons')).append("<div><button class='btn btn-default' data-alert="+scope.count+">Show alert #"+scope.count+"</button></div>");
            });
                // $scope.getComments = function (post_id) {
                //     PostService.getPost(post_id)
                //         .then(function (data) {
                //             filtred = filter.filterPosts(data);
                //             console.log(filtred.comments);
                //             $scope.c_coments = filtred.comments;
                //             // return filtred.comments;
                //         });
                // };
            }
    };


        //     return function(scope, element, attrs){
        //     element.bind("click", function(){
        //         console.log(element);
        //         scope.count++;
        //         angular.element(document.getElementById('space-for-buttons')).append("<div><button class='btn btn-default' data-alert="+scope.count+">Show alert #"+scope.count+"</button></div>");
        //     });
        // };
    }]);