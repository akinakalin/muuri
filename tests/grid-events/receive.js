(function (window) {

  var Muuri = window.Muuri;

  QUnit.module('Grid events');

  QUnit.test('receive: should be triggered, for the receiving grid, after grid.send()', function (assert) {

    assert.expect(7);

    var containerA = utils.createGridElements().container;
    var containerB = utils.createGridElements().container;
    var gridA = new Muuri(containerA);
    var gridB = new Muuri(containerB);
    var item = gridA.getItems()[0];
    var teardown = function () {
      gridA.destroy();
      gridB.destroy();
      containerA.parentNode.removeChild(containerA);
      containerB.parentNode.removeChild(containerB);
    };

    gridB.on('receive', function (data) {
      assert.strictEqual(arguments.length, 1, 'callback: should have one argument');
      assert.strictEqual(Object.prototype.toString.call(data), '[object Object]', 'callback: first argument should be a plain object');
      assert.strictEqual(Object.keys(data).length, 4, 'callback: first argument should have 4 properties');
      assert.strictEqual(data.item, item, 'callback: first argument item property should be the moved item');
      assert.strictEqual(data.fromGrid, gridA, 'callback: first argument fromGrid property should be the sending grid instance');
      assert.strictEqual(data.fromIndex, 0, 'callback: first argument fromIndex property should be the index where the item was moved from');
      assert.strictEqual(data.toIndex, 1, 'callback: first argument toIndex property should be the index where the item was moved to');
    });
    gridA.on('receive', function () {
      assert.ok(false, 'should not be triggered for the sending grid');
    });
    gridA.send(item, gridB, 1, {layout: false});
    teardown();

  });

})(this);