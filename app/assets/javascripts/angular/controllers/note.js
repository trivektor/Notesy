function NoteController($scope) {
  $scope.notes = [];

  var getAllFromDB = function() {
    $scope.store.getAll(
      /* onSuccess */
      function(/* array */ data) {
        $scope.$apply(function() {
          $scope.notes = data;
        })
      },
      /* onError */
      function(error) {
        console.log(error);
      }
    )
  }

  $scope.store = new IDBStore({
    storeName: 'Notesy',
    storePrefix: 'IDBWrapper-',
    dbVersion: 1,
    keyPath: 'id',
    autoIncrement: true,
    indexes: [],
    onStoreReady: getAllFromDB,
    onError: function(error){ throw error; }
  });

  $scope.addNote = function() {
    var note_obj = {
      description : $scope.noteDescription,
      createdAt   : moment().format("MMM Do YY")
    }

    $scope.store.put(note_obj, function(id) {
      $scope.noteDescription = '';
      getAllFromDB();
    }, function(error) {
      console.log(error);
    })
  }

  $scope.deleteNote = function(id) {
    $scope.store.remove(
      id,
      function(result) {
        getAllFromDB();
      },
      function(error) {
        console.log('Error while deleting note: ' + error);
      }
    );
  }

  $scope.deleteAll = function() {
    $scope.store.clear(function() {
      getAllFromDB();
    }, function(error) {
      console.log('Error occured while clearing all: ' + error);
    });
  }
}