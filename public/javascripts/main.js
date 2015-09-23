'use strict';

angular.module('instantApp', [])
  .controller('InstantController', function($scope) {
        var socket = io.connect('http://localhost:3000');
        socket.on('connect', function(data) {
            socket.emit('join');
        });

                      socket.on('moveX', function(x) {
                          $(".move").css({left:x});
                          console.log(x);
                      });
                      socket.on('moveY', function(y) {
                          $(".move").css({top:y});
                          console.log(y);
                      });

            $(document).ready(function() {
                    $(document).on("keydown", KeyOperation);
                    $(".move").on("drag", KeyOperation);
                    $(".move").draggable();
             });

                function KeyOperation(e)
                {
                    //alert("in");
                    var top = $(".move").offset().top;
                    var left = $(".move").offset().left;

                    var IncrementBy = 10;

                    if (e.which == 37) {
                        $(".move").css({ left: left - 10 });
                    }
                    else if (e.which == 38) {
                        $(".move").css({ top: top - IncrementBy });
                    }
                    else if (e.which == 39) {
                        $(".move").css({ left: left + IncrementBy });
                    }
                    else if (e.which == 40) {
                        $(".move").css({ top: top + IncrementBy });
                    }

                      socket.emit('moveX', $(".move").offset().left);
                      socket.emit('moveY', $(".move").offset().top);
                }
  });
