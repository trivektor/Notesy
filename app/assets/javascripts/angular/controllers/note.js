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
    storeName: 'Notesy1',
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

    $scope.store.put(note_obj)
    $scope.noteDescription = '';
    getAllFromDB();
  }

  $scope.deleteNote = function(index) {
    $scope.notes.splice(index, 1);
  }
}