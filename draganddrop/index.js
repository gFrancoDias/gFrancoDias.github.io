$(function () {


    var isMoving = false;
    var boundings;
    var topZIndex = 1;
    var mouseDownPosition = {
        top: 0,
        left: 0
    }
    var elementMoving = null;
    var elementCoordinates;

    function getBoundings(element) {
        var absoluteContainerBounding = element.getBoundingClientRect();
        var parentContainerBounding = element.parentElement.getBoundingClientRect();
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return {
            childElement: {
                top: absoluteContainerBounding.top + scrollTop,
                left: absoluteContainerBounding.left + scrollLeft
            },
            parentElement: {
                top: parentContainerBounding.top + scrollTop,
                left: parentContainerBounding.left + scrollLeft
            }
        };
    }

    function validateCoordinates(moveCoordinates) {
        var parentElement = $(elementMoving).parent();
        var limits = {
            xmin: 0,
            ymin: 0,
            xmax: $(parentElement).outerWidth() - $(elementMoving).outerWidth(),
            ymax: $(parentElement).outerHeight() - $(elementMoving).outerHeight()
        }
        moveCoordinates.left < limits.xmin ? moveCoordinates.left = limits.xmin : {};
        moveCoordinates.left > limits.xmax ? moveCoordinates.left = limits.xmax : {};
        moveCoordinates.top < limits.ymin ? moveCoordinates.top = limits.ymin : {};
        moveCoordinates.top > limits.ymax ? moveCoordinates.top = limits.ymax : {};
        return moveCoordinates;
    }



    $(".absolute-container").mousedown(function (mouseDownEvent) {
        boundings = getBoundings(this);
        isMoving = true;
        elementMoving = this;
        $(this).css("z-index", topZIndex + 1);
        topZIndex++;
        mouseDownPosition = {
            top: mouseDownEvent.clientY,
            left: mouseDownEvent.clientX
        }
        elementCoordinates = {
            top: parseFloat($(elementMoving).css('top').slice(0, -2)),
            left: parseFloat($(elementMoving).css('left').slice(0, -2))
        }
    });

    $(window).mousemove(function (mouseMoveEvent) {

        if (isMoving) {
            var moveCoordinates = {
                top: elementCoordinates.top + parseFloat(mouseMoveEvent.clientY - mouseDownPosition.top),
                left: elementCoordinates.left + parseFloat(mouseMoveEvent.clientX - mouseDownPosition.left)
            }

            moveCoordinates = validateCoordinates(moveCoordinates);
            // console.log(`element moving to  ${moveCoordinates.left + elementCoordinates.left} left and ${moveCoordinates.top + elementCoordinates.top} top`);
            $(elementMoving).css({
                'top': moveCoordinates.top + 'px',
                'left': moveCoordinates.left + 'px'
            });
        }
    });

    $(window).mouseup(function () {
        // console.log('up');
        isMoving = false;
        elementMoving = null;
    });



});